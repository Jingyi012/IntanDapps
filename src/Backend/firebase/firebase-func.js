import { useState, useEffect } from 'react';
import '../../App.css';
import { db } from 'firebase-config.js'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

//read, collection, 
//create, getDocs,addDoc
//update, updateDoc,doc
//delete, deleteDoc


function DataCRUD() {
  const [newName, setNewName] = useState("");//create 1.1
  const [newAge, setNewAge] = useState(0);//create 1.2

  const [users, setUsers] = useState([]);//read 1.1
//  const userCollectionRef = collection(db, "users")//crud 1,collection(reference, collectionName)
  const userCollectionRef = collection(db, "users","anotherCollection","usersCollection")//crud 1,collection(reference, collectionName)

  const createUser = async () => {//creat 2
    await addDoc(userCollectionRef, {
      name: newName,
      age: Number(newAge),
    });
  };//create 2 end

  const updateUser = async (id, age) => { //update 2
    const userDoc = doc(db, "users","anotherCollection","usersCollection", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  }//update 2 end

  const deleteUser = async (id) => { //delete 2
    const userDoc = doc(db, "users","anotherCollection","usersCollection", id);
    await deleteDoc(userDoc);
  } //delete 2 end

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);//read 2
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3

    }

    getUsers()
  }, [])

  return (
    <div className="DataCRUD">
      <input
        placeholder='Name...'
        onChange={(event) => {
          setNewName(event.target.value)
        }}//create 3,onChange
      />
      <input
        type="number"
        placeholder='Age...'
        onChange={(event) => {
          setNewAge(event.target.value)
        }}//create 4,onChange
      />

      <button onClick={createUser}>Create User</button>{/* create 5*/}
      
      {users.map((user) => { //read 4
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age)//update 3
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);//delete 3
              }}
            >
              Delete User
            </button>
          </div>
        );
      })//read 4 end
      }
    </div>
  );
}

export default DataCRUD;