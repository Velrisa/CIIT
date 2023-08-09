import { useState } from "react";
import {useAuth} from '../context/AuthContext'
import Papa from "papaparse";

function AgregarUsuariosLote() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const [usuarioMarcado, setUsuarioMarcado] = useState(false);

  //Arreglo para extraer los datos del CSV
  const [nombresArreglo, setNombresArreglo] = useState([]);
  const [numControlArreglo,setNumControlArreglo] = useState([]);
  const [correosArreglo, setCorreosArreglo] = useState([]);

  //Arreglos que seran utilizados para registrar a usuarios
  let [usuarioRegistro, setUsuarioRegistro] = useState([]);

  //Para registrar a los usuarios
  const {signupBatch} = useAuth();

  let indice = 0;
  var datosUsuario = {};

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        
        for (let i = 0; i < rowsArray.length; i++) {
          numControlArreglo.push(valuesArray[i][1]);
          setNumControlArreglo(numControlArreglo);

          nombresArreglo.push(valuesArray[i][2]);
          setNombresArreglo(nombresArreglo);
          
          correosArreglo.push(valuesArray[i][3]);
          setCorreosArreglo(correosArreglo);
        }
      },
    });
  };

  /*Guardar los valores cuando se seleccionan los datos en la tabla*/
  const handleChange = event2 => {
    if (event2.target.checked) {
      usuarioRegistro.push(event2.target.id);
      console.log(usuarioRegistro)
      setUsuarioRegistro(usuarioRegistro);
    } 
    
    else {
      indice = usuarioRegistro.indexOf(event2.target.id);
      usuarioRegistro.splice(indice,1)
      console.log(usuarioRegistro)
      setUsuarioRegistro(usuarioRegistro);
    }

    setUsuarioMarcado(current => !current);
  };

  //Para manejar los eventos del presionado de boton
  const handleClick = ()  => {
    if(usuarioRegistro.length==0){
      alert('¡No ha seleccionado ningun campo!');
    }
    else {
      alert('Se enviaran ' + usuarioRegistro.length+ ' campos a registrar');

      for(let k = 0; k< usuarioRegistro.length;k++){
        datosUsuario = {
          "numControl": numControlArreglo[usuarioRegistro[k]],
          "nombre": nombresArreglo[usuarioRegistro[k]],
          "correo": correosArreglo[usuarioRegistro[k]],
          "password": numControlArreglo[usuarioRegistro[k]],
          "profesor": false
        }

        try{
          signupBatch(datosUsuario);
        }

        catch(error){
          alert(error);
        }
      }
    }
  }


  return (
    <div className="items-center justify-center">
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      <h1>Seleccione usuarios a registrar</h1>
      {/* Table */}
      <table> 
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}<input type="checkbox" id={(index)} 
                value={usuarioMarcado} onChange={handleChange}/>
              </tr>
            );
          })}
        </tbody>
      </table><button type="submit" className="bg-indigo-500 px-4 py-1 rounded-sm" onClick={handleClick}>Confirmar</button>
    </div>
  );
}

export default AgregarUsuariosLote;