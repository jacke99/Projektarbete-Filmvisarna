import { useState, useEffect } from "react"
import { performRequest } from "../../service/fetchService"
import { styles } from "../../styles.js";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../service/jwtService";


export default function AdminUsers() {
    const [users, setUsers] = useState(undefined)
    const navigate = useNavigate()
    useEffect(() => {
        const authToken = sessionStorage.getItem("AuthToken");
        if(!authToken || authToken === "") {
          navigate("/")
        } else if(authToken) {
          const decoded = parseJwt(authToken)
          if(decoded.role !== "ADMIN") {
            navigate("/")
          }
        }
      }, [navigate])

  useEffect(() => {
  async function getUsers() {
    const resp = await performRequest("/api/users", "GET")
    setUsers(resp)
  }
  getUsers()
  }, [])


    return (
    <div className="mt-12">

        <div className="max-w-fit flex flex-col justify-center m-auto">
            <div id="UserListHeader" className="flex justify-between items-end p-4">            
                <h1 className="text-2xl text-white">ANVÄNDARE</h1>
                <div className="flex gap-3">
                        <input placeholder="Sök..." type="text" id="filmTitle" name="filmTitle" className={`${styles.inputStyle}`}/>
                        <button type="submit" className={`rounded-md bg-gold p-1 px-4 text-black-100 w-16 self-center`}>Sök
                        </button>
                </div>
            </div>

            <table id="table_users" className="w-full table-auto bg-white">
                <tbody>
                    <tr className="px-3" >
                        <th>Namn</th>
                        <th>Mobil</th>
                        <th>E-post</th>
                        <th></th>
                        <th></th>
                    </tr>
                {users && users.map((user, key) => {
                        return (
                            <tr key={key} className="">
                                <td>{`${user.name} ${user.lastname}`}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td><button className={`rounded-md bg-green-200 p-1 px-4 text-black-100 self-center`}>Redigera</button></td>
                                <td className="p-4 text-center"><button className={`rounded-md bg-red-200 p-1 px-4 text-black-100 self-center`}>Ta bort</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
</div>
    )
}