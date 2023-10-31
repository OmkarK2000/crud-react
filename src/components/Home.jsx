import { useState } from 'react'
import "../App.css"

const Home = () => {

    const [inputs, setInputs] = useState({
        name: "",
        email: ""
    })
    const [tableData, setTableData] = useState([])
    const [editClick, setEditClick] = useState(false)
    const [editIndex, setEditIndex] = useState('') 

    const handleChange = (e) => {
        setInputs({
            ...inputs, [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(editClick){
            const tempTableData=tableData
            Object.assign(tempTableData[editIndex],inputs)
            setTableData([...tempTableData])
            setEditClick(false)
            setInputs({
                name: "",
                email: ""
            })
    
        }else{
            setTableData([...tableData, inputs])
        setInputs({
            name: "",
            email: ""
        })
        }
    }

    const handleDelete = (index) => {
        const filterItem = tableData.filter((item, i) => i !== index)
        setTableData(filterItem)
    }

    const handleEdit = (index) => {
        const tempData = tableData[index]

        setInputs({name: tempData.name, email: tempData.email})
        setEditClick(true)
        setEditIndex(index)
    }

  return (
    <div>
        <div className='container'>
          <h1>CRUD App</h1>
          <div className='innerContainer'>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label><br />
                <input type="text" placeholder='Enter your name' name='name' value={inputs.name} onChange={handleChange}/>
              </div>
              <div>
                <label>Email</label><br />
                <input type="email" placeholder='Enter your email' name='email' value={inputs.email} onChange={handleChange}/>
              </div>
              <button type='submit'>{editClick?"Update":"Add"}</button>
            </form>
          </div>
          <div className='innerContainer'>
            <table>
                <thead>
                    <tr className='trCon'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item,i) => (
                        <tr className='trCon' key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td className='tdCon'>
                                <button onClick={()=>handleEdit(i)}>Edit</button><br />
                                <button onClick={()=>handleDelete(i)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default Home