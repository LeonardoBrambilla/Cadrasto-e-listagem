import React,{ useState , useEffect } from "react"
import axios from 'axios';
import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, Button , Box ,Collapse } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell , IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
      const {data} = await axios.get("https://cadrasto-e-listagem-server.vercel.app/")
      setProducts(data)
    }
    get()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://cadrasto-e-listagem-server.vercel.app/",{name,description,value,sell})
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
              required
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
      <Box style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:10,width:650}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{color:"white"}}></TableCell>
              <TableCell align="center" sx={{color:"white"}}>Nome</TableCell>
              <TableCell align="center">
                <Button sx={{color:"white"}} onClick={handleSort}>
                  {sortAscending ? 'Valor ▲' : 'Valor ▼'}
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button sx={{color:"white"}} onClick={handleSell}>
                  Disponivel
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(e=>(
              <TableComponent product={e}/>
              // <TableRow hover={true}  key={e._id}>                
              //   <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{e.name}</TableCell>                
              //   <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{e.value}</TableCell>
              //   <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{e.sell ? "sim" : "não" }</TableCell>     
              //     <IconButton onClick={() => handleRemoveItem(e._id)}>
              //       <DeleteOutlineIcon sx={{color:"red"}}/>
              //     </IconButton>
              // </TableRow>
    
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  )
}


const TableComponent = ({product}) => {
  const [open, setOpen] = useState(false);

  const handleRemoveItem = async () => {
    await axios.delete(`https://cadrasto-e-listagem-server.vercel.app/${product._id}`)
  }
  return (
    <>
      <TableRow hover={true}  >      
        <TableCell sx={{borderBottom:"none"}}>
          <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>      
        <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{product.name}</TableCell>                
        <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{product.value}</TableCell>
        <TableCell align="center" sx={{color:"white",borderBottom:"none"}}>{product.sell ? "sim" : "não" }</TableCell>     
          <IconButton onClick={() => handleRemoveItem(product._id)}>
            <DeleteOutlineIcon sx={{color:"red"}}/>
          </IconButton>
      </TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0,color:"white" ,border:"none"}} colSpan={5}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            Descrição: {product.description}
          </Box>
        </Collapse>
      </TableCell>
    </>
  )
}