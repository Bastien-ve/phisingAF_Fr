import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3001"
})


const connection = (user) => {
    return client.post("/connection", {user});
  };


  

  
export { connection  };




