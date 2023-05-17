import { useState , useEffect } from "react"
import axios from 'axios';
import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, Button , Box ,Collapse } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function List() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [sell, setSell] = useState(false);

  const [sortSell, setSortSell] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);

  const [products,setProducts] = useState([])

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const get = async () => {
      const {data} = await axios.get("http://localhost:5000/")
      console.log(data)
      setProducts(data)
    }
    get()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/",{name,description,value,sell})
    setProducts([...products,{name,description,value,sell}])
    setName('');
    setDescription('');
    setValue('');
    setSell(false);
  };

  const handleSort = () => {
    setProducts([...products].sort((a, b) => {
      if (sortAscending) {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    }));
    setSortAscending(!sortAscending);
  };


  const handleSell = () => {
    setProducts([...products].sort((a, b) => {
      if (sortSell) {
        return a.sell - b.sell;
      } else {
        return b.sell - a.sell;
      }
    }));
    setSortSell(!sortSell);    
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Button onClick={toggleFormVisibility} marginBottom={2} variant="contained" color="primary">
        {isFormVisible ? 'Esconder Formulário' : 'Mostrar Formulário'}
      </Button>
      <span style={{margin:20}}/>
      <Collapse in={isFormVisible} collapsedHeight={0}>
        <form onSubmit={handleSubmit} >
          <Box display="flex" alignItems={"center"}>
            <TextField
              label="Nome do produto"
              value={name}
              onChange={(event) => setName(event.target.value)}        
              InputLabelProps={{ style: {color:"white"} }}
              InputProps={{ style: {color:"white"} }}
              sx={{ m: 2 }}
            />
            <TextField
              label="Descrição do produto"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              InputLabelProps={{ style: {color:"white"} }}
              InputProps={{ style: {color:"white"} }}
              sx={{ m: 2 }}
            />
            <TextField
              label="Valor do produto"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              type="number"
              required
              InputLabelProps={{ style: {color:"white"} }}
              InputProps={{ style: {color:"white"} }}
              sx={{ m: 2 }}
            />
            <FormControl>
              <RadioGroup
                value={sell}
                onChange={(event) => setSell(event.target.value)}
              >
                <FormControlLabel value={true} control={<Radio />} label="Disponível" />
                <FormControlLabel value={false} control={<Radio />} label="Não disponível" />
              </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </form>
      </Collapse>
      <Box style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:10,width:700}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{color:"white"}}>Nome</TableCell>
              <TableCell align="center" sx={{color:"white"}}>Descrição</TableCell>
              <TableCell align="center">
                <button onClick={handleSort}>
                  {sortAscending ? 'Valor ▲' : 'Valor ▼'}
                </button>
              </TableCell>
              <TableCell align="center">
                <button onClick={handleSell}>
                  Disponivel
                </button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(e=>(
              <TableRow hover={true}  key={e.key}>
                <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{e.name}</TableCell>
                <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{e.description}</TableCell>
                <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{e.value}</TableCell>
                <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{e.sell ? "sim" : "não" }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  )
}
