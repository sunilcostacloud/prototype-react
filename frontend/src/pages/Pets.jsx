import { useState } from "react";
import { useFetchBreedsQuery } from "../redux/features/pets/petsSlice";



const Pets = () => {

  const [numOfDogs, setNumberOfDogs] = useState(10);

  const [num, setNum] = useState(numOfDogs);

  const { data, isFetching, isSuccess, isError, error, refetch } = useFetchBreedsQuery(numOfDogs);

  console.log("pets", data)

  return (
    <div>

      <div style={{ display: "flex", justifyContent: "center" }} >
        <div>
          <h1>Pets Api</h1>
          <div>
            <p>Pets to fetch</p>
            <input type="number" value={num} onChange={(e) => setNum(e.target.value)} placeholder='enter number of dogs to fetch' />
            <button onClick={() => setNumberOfDogs(num)} >Fetch</button>
            <button onClick={() => refetch()}>Refetch pets</button>
          </div>
        </div>
      </div>

      {
        isFetching ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            Loading...
          </div>
        ) : isError ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h4>{error.message}</h4>
          </div>
        ) : data?.length == 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>No Data Found</h1>
          </div>
        ) : isSuccess ? (
          <>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }} >
                <p>Number of dogs Fetched : {data.length}</p>
              </div>
              <table style={{ margin: "auto" }} >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Picture</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id} >
                      <td>{item.name}</td>
                      <td>
                        <img src={item.image.url} alt={item.name} style={{ width: "100px" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : ""
      }
    </div>
  )
}

export default Pets