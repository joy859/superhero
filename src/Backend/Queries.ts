import { signOut } from 'firebase/auth';
import { authDataType, userType, } from './../Types';



import {createUserWithEmailAndPassword} from '@firebase/auth';
import {auth, db } from './Firebase';
import {toastErr} from '../utils/toast'
import CatchErr from '../utils/catchErr';
import { setLoadingType } from '../Types';
import { signInWithEmailAndPassword} from '@firebase/auth';
import { Await, NavigateFunction } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import userSlice, { defaultUser, setUser, setUsers, userStorageName } from '../Redux/userSlice';
import { AppDispatch } from '../Redux/store';
import ConvertTime from '../utils/ConvertTime';
import AvatarGenerator from '../utils/avatarGenerator';



//collection names
const usersColl ='users';
const tasksColl ='tasks';
const taskListColl='taskList';
const chatsColl ='chats';
const messagesColl='messages';

//register or signup user
export const BE_signUp =(
    data: authDataType,
setLoading:setLoadingType ,
reset:() =>void,
goTO:NavigateFunction,
dispatch:AppDispatch

) =>{
    const {email,password,confirmPassword}=data;
//loading true
setLoading(true);

    if(email && password) {
      if (password ===confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async({user })=> {

                //generate user avatar with user name
                const imgLink =AvatarGenerator( user.email?.split('@')[0] );
            
       const userInfo= await addUserToCollection(
        user.uid,
        user.email ||'', 
        user.email?.split('@')[0] ||'',
      imgLink

    );
   //set use in store
  
     dispatch(setUser(userInfo))

   setLoading(false);
    reset();
    goTO('/dashboard');
   

      })
      .catch((err) => {
        CatchErr (err);
          setLoading(false);
    });
       
       } else toastErr('Password must match!',setLoading);
    }else toastErr('Fields should not be left empty!',setLoading);
        
     
     

};
// sign in a user
export const BE_signIn =(
     data:authDataType,
setLoading:setLoadingType,
reset:() =>void,
goTO:NavigateFunction,
dispatch:AppDispatch
) => {
 const {email,password} = data;
    
 //loading true
    setLoading(true);

    signInWithEmailAndPassword(auth,email,password)
    .then(async ({user}) => {

        //update user isOnline to true
        await updateUserInfo ({id:user.uid,isOnline:true});

        //get user info
        const userInfo = await getUserInfo(user.uid);

       
       //set use in store
   dispatch(setUser(userInfo));

    setLoading(false);
    reset();
    goTO('/dashboard');
   

    })
    .catch(err => {
        CatchErr(err);
        setLoading(false);
    });
} ;

   //sign out
   export const BE_signOut = (dispatch:AppDispatch ,gotTo:NavigateFunction ,setloading:setLoadingType) =>{
    setloading(true)
    //logout in fire base
    signOut(auth) .then (async() =>{
      //route to auth page
    gotTo('/auth');
    //set user offline
    await updateUserInfo({isOffline:true});
//set currentselected  user to empty user
dispatch(setUser(defaultUser));

    //remove from local storage

    localStorage.removeItem(userStorageName);
    

    }).catch (err=> CatchErr(err))
   
   };
   //get user from local storage
   export const getStorageUser=() =>{
  const usr= localStorage.getItem (userStorageName)
    if(usr) return JSON.parse(usr)
      else return null;
  
};

    //add user to collection 
const addUserToCollection =async(
    id:string,
    email:string,
    username:string,
    img:string,
) =>{
    //create user  with user id
await setDoc(doc(db, usersColl, id),{
    isOnline:true,
    img,
    username,
    email,
    creationTime: serverTimestamp (),
    lastSeen:serverTimestamp(),
    bio: `Hi my name is $ {username}, thanks to desmond i understand react and typescript now,and i am comfortable working with this them.i can also build beautiful user interfaces`
});
return getUserInfo (id);
};
//get user information
const getUserInfo = async (id: string) :Promise<userType> => {
    const userRef = doc(db, usersColl, id);
    const user =await getDoc (userRef);

    if(user.exists()){
      const {img , isOnline,username,email,bio,creationTime,lastSeen} = user .data();
      return{
      id:user.id,
      img,
      isOnline, 
      username,
      email,
      bio,
      creationTime: creationTime? ConvertTime(creationTime.toDate()) :'no date yet :userinfo',
      lastSeen:lastSeen? ConvertTime(lastSeen.toDate()) :'no date yet :userinfo',
      }

    } else {
        toastErr('getUserInfo:user not found');
      return defaultUser;
    }

};
//update user info
const updateUserInfo =async({
  id,
  username,
  img,
  isOnline,
  isOffline
}
  :{
    id?:string
  username?:string;
   img?:string;
isOnline?:boolean;
  isOffline?:boolean;
  })=>{
  if (!id) {
    id = getStorageUser().id;
  }
if(id){

//{username}//...{username}=username
//username ? {username} :null
//username && {username}
    await updateDoc(doc(db ,usersColl,id),{
    ...(username && {username}),
    ...(isOnline && {isOnline}),
    ...(isOffline && {isOffline:false}),
    ...(img && {img}), //img:someimage
      lastSeen:serverTimestamp(),
      });

}
};


