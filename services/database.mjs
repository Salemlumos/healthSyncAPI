import { initializeApp } from "firebase/app";
import {getFirestore,collection,getDocs,query,where,doc,getDoc,addDoc,updateDoc,deleteDoc,collectionGroup} from "firebase/firestore"
import { firebaseConfig } from "./firebase.mjs";


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

db.insertUser = async(collectionName, documentData)=>{
  const collectionRef = collection(db, collectionName);

  try {
    // Use addDoc to add a new document to the collection
    const newDocRef = await addDoc(collectionRef, documentData);
    
    return {
      status: 'ok',
      data: newDocRef.id, // Return the ID of the newly added document
      message: 'Document added successfully',
    };
  } catch (error) {
    console.error('Error adding document: ', error);

    return {
      status: 'not ok',
      data: null,
      message: 'Error: ' + error.message,
    };
  }
}

db.updateUser =async (collectionName, userId, updatedData)=>{
  const collectionRef = collection(db, collectionName);
  const userRef = doc(collectionRef, userId);

  try {
    // Use updateDoc to update an existing document in the collection
    await updateDoc(userRef, updatedData);

    return {
      status: 'ok',
      data: userId, // Return the ID of the updated document
      message: 'Document updated successfully',
    };
  } catch (error) {
    console.error('Error updating document: ', error);

    return {
      status: 'not ok',
      data: null,
      message: 'Error: ' + error.message,
    };
  }
}
db.searchAll = async(collectionName)=>{
  const collectionRef = collection(db, collectionName);

  // Initialize an empty array to store the documents
  const dataArray = [];
  
  // Get all documents in the collection
  await getDocs(collectionRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Access each document's data and push it into the array
        const data = {...doc.data(),...{id:doc.id}};
        dataArray.push(data);
      });
  
      // Now dataArray contains all the documents' data
      console.log(dataArray);
     
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);

      return({
        status:'not ok',
        data:[],
        message:'Error:',error
      })
    });

    return({
      status:'ok',
      data:dataArray,
      message:'Success'
    })
};
db.getMedicsByAreaId = async (areaId) => {
  const medicsCollectionRef = collection(db, 'medico');
  const usersCollectionRef = collection(db, 'usuario');

  try {
    const medicsQuery = query(medicsCollectionRef, where('IdEspecialidade', '==', areaId));
    const querySnapshot = await getDocs(medicsQuery);

    if (querySnapshot.size === 0) {
      throw new Error('Medic not found');
    }

    const dataArray = [];

    // Use forEach for better readability and to avoid issues with async map
    await Promise.all(querySnapshot.docs.map(async (medicDoc) => {
      const querySnapshotUser = await getDocs(usersCollectionRef);

      querySnapshotUser.forEach((userDoc) => {
        // console.log(medicDoc.data())
        console.log(userDoc.id === medicDoc.data().IdUsuario)
        if (userDoc.id === medicDoc.data().IdUsuario) {
          const data = { ...userDoc.data(), ...{ id: userDoc.id } };
          dataArray.push(data);
        }
      });
    }));
    console.log(dataArray)
    if (dataArray.length === 0) {
      throw new Error('No matching users found for medics');
    }

    return {
      status: 'ok',
      data: dataArray,
      message: 'Medicos found',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 'not ok',
      data: [],
      message: 'Error: ' + error.message,
    };
  }
};

db.getAllMedics = async () => {
  const medicsCollectionRef = collection(db, 'medico');
  const usersCollectionRef = collection(db, 'usuario');
  const specialtiesCollectionRef = collection(db, 'especialidadesMedicas');

  try {
    // Query all medics
    const querySnapshot = await getDocs(medicsCollectionRef);

    if (querySnapshot.size === 0) {
      throw new Error('No medics found');
    }

    const dataArray = [];

    // Iterate through each medic document
    for (const medicDoc of querySnapshot.docs) {
      // Use collectionGroup to query the 'usuario' collection for the specified IdUsuario
      const querySnapshotUser = await getDocs(collectionGroup(db, 'usuario'));
      
      // Find the user document matching the IdUsuario
      const userDoc = querySnapshotUser.docs.find(user => user.id === medicDoc.data().IdUsuario);

      if (userDoc) {
        // Get the specialty details for the medic
        const specialtyDoc = await getDoc(doc(specialtiesCollectionRef, medicDoc.data().IdEspecialidade));
        
        const data = {
          user: { ...userDoc.data(), id: userDoc.id },
          medic: { ...medicDoc.data(), id: medicDoc.id },
          specialty: { ...specialtyDoc.data(), id: specialtyDoc.id },
        };

        dataArray.push(data);
      }
    }

    if (dataArray.length === 0) {
      throw new Error('No matching users found for medics');
    }

    return {
      status: 'ok',
      data: dataArray,
      message: 'Medics found',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 'not ok',
      data: [],
      message: 'Error: ' + error.message,
    };
  }
};
db.getAllNonMedicUsers = async () => {
  const medicsCollectionRef = collection(db, 'medico');
  const usersCollectionRef = collection(db, 'usuario');

  try {
    // Query all medics
    const medicsQuerySnapshot = await getDocs(medicsCollectionRef);

    if (medicsQuerySnapshot.size === 0) {
      throw new Error('No medics found');
    }

    const medicIds = medicsQuerySnapshot.docs.map(medicDoc => medicDoc.data().IdUsuario);

    // Query all users
    const usersQuerySnapshot = await getDocs(usersCollectionRef);

    if (usersQuerySnapshot.size === 0) {
      throw new Error('No users found');
    }

    const nonMedicUsersArray = [];

    // Iterate through each user document
    for (const userDoc of usersQuerySnapshot.docs) {
      // Exclude users who are medics
      if (!medicIds.includes(userDoc.id)) {
        nonMedicUsersArray.push(
         { ...userDoc.data(), id: userDoc.id }
        );
      }
    }

    if (nonMedicUsersArray.length === 0) {
      throw new Error('No non-medic users found');
    }

    return {
      status: 'ok',
      data: nonMedicUsersArray,
      message: 'Non-medic users found',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 'not ok',
      data: [],
      message: 'Error: ' + error.message,
    };
  }
};


db.searchUserByEmailAndPassword = async (collectionName, email, senha) => {
  const collectionRef = collection(db, collectionName);

  try {
    const q = query(collectionRef, 
      where('Email', '==', email),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 1) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      return {
        status: 'ok',
        data: {...userData,...{id:userDoc.id}},
        message: 'User found',
      };
    } else if (querySnapshot.size === 0) {

      return {
        status: 'ok',
        data: null,
        message: 'User not found'
      };
    } else {
      //More than one user was found (an issue)
      return {
        status: 'not ok',
        data: null,
        message: 'Multiple users with the same email and senha'
      };
    }
  } catch (error) {
    console.error('Error searching for user: ', error);
    return {
      status: 'not ok',
      data: null,
      message: 'Error: ' + error.message
    };
  }
};

db.findById = async(collectionName,documentId)=>{
  const documentRef = doc(db, collectionName, documentId);
console.log(documentId)
// Use getDoc to retrieve the document

let res=''

await getDoc(documentRef)
  .then((docSnapshot) => {
    if (docSnapshot.exists()) {
      // The document exists, and you can access its data
      const data = docSnapshot.data();
      console.log('Document data:', data);
      res= data
    } else {
      console.log('Document does not exist');
      res= []
    }
  })
  .catch((error) => {
    console.error('Error getting document:', error);
  });
  return res
};
db.findAgendamentosByUserId = async (userId) => {
  const agendamentoCollectionRef = collection(db, 'agendamento');

  try {
    const querySnapshot = await getDocs(
      query(agendamentoCollectionRef, where('userId', '==', userId))
    );

    const agendamentos = [];

    querySnapshot.forEach((doc) => {
      // Access each document data and add it to the result array
      const data = doc.data();
      agendamentos.push({...data,...{eventId:doc.id}});
    });

    return {
      status: 'ok',
      data: agendamentos,
      message: 'Success',
    }
  } catch (error) {
    console.error('Error getting agendamentos:', error);
    
    return {
      status: 'not ok',
      data: [],
      message: error,
    }
    throw error; // Re-throw the error to propagate it to the calling code
  }
};
db.findAgendamentosByMedicId = async (userId) => {
  const agendamentoCollectionRef = collection(db, 'agendamento');

  try {
    const querySnapshot = await getDocs(
      query(agendamentoCollectionRef, where('medico', '==', userId))
    );

    const agendamentos = [];

    querySnapshot.forEach((doc) => {
      // Access each document data and add it to the result array
      const data = doc.data();
      agendamentos.push({...data,...{eventId:doc.id}});
    });

    return {
      status: 'ok',
      data: agendamentos,
      message: 'Success',
    }
  } catch (error) {
    console.error('Error getting agendamentos:', error);
    
    return {
      status: 'not ok',
      data: [],
      message: error,
    }
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

db.searchByCode = async (collectionName, code) => {
  const collectionRef = collection(db, collectionName);
  console.log('Searhcing by id')
  console.log("code:",code)
  try {
    // Reference to the specific document using the code as the document ID
    const documentRef = doc(collectionRef, code);

    // Get the document data
    const docSnapshot = await getDoc(documentRef);
    // Check if the document exists
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      console.log(data);
      return {
        status: 'ok',
        data: data,
        message: 'Success',
      };
    } else {
      console.log('Document not found');
      return {
        status: 'not ok',
        data: null,
        message: 'Document not found',
      };
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    return {
      status: 'not ok',
      data: null,
      message: 'Error: ' + error,
    };
  }
};

db.insertEspecialidade = async(collectionName, documentData)=>{
  const collectionRef = collection(db, collectionName);

  try {
    // Use addDoc to add a new document to the collection
    const newDocRef = await addDoc(collectionRef, documentData);
    
    return {
      status: 'ok',
      data: newDocRef.id, // Return the ID of the newly added document
      message: 'Document added successfully',
    };
  } catch (error) {
    console.error('Error adding document: ', error);

    return {
      status: 'not ok',
      data: null,
      message: 'Error: ' + error.message,
    };
  }
}

db.insertMedico = async (especialidadeId, userId) => {
  const medicosCollectionRef = collection(db, 'medico');

  try {
    // Update user document's 'PerfilFk' field
    const userDocRef = doc(db, 'usuario', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        PerfilFk: '6GDLTYAM609pUFxLTBCZ',
      });

      // Add data to the 'medicos' collection
      await addDoc(medicosCollectionRef, {
        IdUsuario: userId,
        IdEspecialidade: especialidadeId,
      });

      return {
        status: 'ok',
        data: {
          especialidadeId: especialidadeId,
          userId: userId,
        },
        message: 'User updated and added to medicos collection successfully',
      };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error adding document: ', error);

    return {
      status: 'not ok',
      data: null,
      message: 'Error: ' + error.message,
    };
  }
};

db.deleteDocument = async (collectionName, documentId) => {
  if (!documentId) {
    return {
      status: 'not ok',
      message: 'Error: Document ID is required',
    };
  }

  const collectionRef = collection(db, collectionName);
  const documentRef = doc(collectionRef, documentId);

  try {
    // Use deleteDoc to delete the document from the collection
    await deleteDoc(documentRef);

    return {
      status: 'ok',
      message: 'Document deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting document: ', error);

    return {
      status: 'not ok',
      message: 'Error: ' + error.message,
    };
  }
};
db.updateDocument = async (collectionName, documentId, updateData) => {
  if (!documentId) {
    return {
      status: 'not ok',
      message: 'Error: Document ID is required',
    };
  }

  const collectionRef = collection(db, collectionName);
  const documentRef = doc(collectionRef, documentId);

  try {
    // Use updateDoc to update the document in the collection
    await updateDoc(documentRef, updateData);

    return {
      status: 'ok',
      message: 'Document updated successfully',
    };
  } catch (error) {
    console.error('Error updating document: ', error);

    return {
      status: 'not ok',
      message: 'Error: ' + error.message,
    };
  }
};



export {db}
