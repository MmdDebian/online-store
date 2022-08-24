import { useEffect, useState } from "react";
import { getUser } from "../services/users.service";

function Home() {

    const [user , setUser] = useState(null);
    
    useEffect(()=>{
        getUser().then(response=>{
            setUser(response.data)
        })
        .catch(err=>{
            setUser(null)
        })
    });
    return (
        <>
            {user && 
              (
                  <div>
                      <p className="text-info">{user.name}</p>
                  </div>
              )
            }
            <h1>Home page</h1>
        </>
    );
}

export default Home;