import React, { useEffect, useState } from 'react'
import { Button, notification } from "antd"
import data from "./data.json"
import axios from "axios"

const App = () => {

  const [index, setIndex] = useState(1)
  const [story, setStory] = useState([])
  const [value, setValues] = useState({
    id: "",
    name: "",
    content: "",
    funny: ""
  })
  const fetchStory = (index) => {
    setIndex(index + 1)
    console.log(index)
    const newStory = data.filter((x) => x.id === index)
    setStory(newStory)
  }

  const updateStory = async (id, string) => {
    console.log(typeof (string))
    try {
      const { data } = await axios.get(`https://62b9626541bf319d227b2b79.mockapi.io/Joke/${id}`)
      console.log("get data success", data);
      setValues({ ...value, id: data.id, name: data.name, content: data.content, funny: string })
      console.log(value)
      updateApi()
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const updateApi = async () => {
    const { id } = value
    try {
      await axios.put(`https://62b9626541bf319d227b2b79.mockapi.io/Joke/${id}`, value)
      console.log("update success")
    }
    catch (error) {
      console.log(error)
    }
  }

  if (index > 7) {
    notification.error({
      message: 'Come back another day',
      description:
        "That's all the jokes for today! Come back another day!",
    });
  }

  useEffect(() => {
    fetchStory(index)
  }, [])

  if (!story) {
    return null
  }
  return (<>
    <header>
      <img src='logoH.jpg' alt='' />
      <img className='logoRight' src='logoS.jpg' alt=''></img>
    </header>
    <div className='title'>
      <h1 style={{ color: "#fff" }}> A joke a day keeps the doctor away</h1>
      <h4 style={{ color: "#fff" }}>If you joke wrong away, you teeth have to pay, (Serious)</h4>
    </div>
    <div className='container'>
      <div className='story'>
        <span>{story.map(storye => { return storye.content })}</span>
      </div>
      <hr />
      <div className='button'>
        <Button
          className='buttonDesign'
          disabled={index === 8}
          type='primary'
          style={{ marginRight: '10px' }}
          size='large'
          onClick={() => {
            updateStory(index, "this is Funny"); fetchStory(index);
          }}>
          This is Funny!
        </Button>
        <Button
          className='buttonDesign'
          disabled={index === 8}
          type='success'
          style={{ marginLeft: '10px' }}
          size='large'
          onClick={() => {
            updateStory(index, "this is not Funny"); fetchStory(index);
          }}>
          This is not Funny.
        </Button>
      </div>
    </div>
  </>
  )
}

export default App

