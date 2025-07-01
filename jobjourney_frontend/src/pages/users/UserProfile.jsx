// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// function UserProfile() {
//     const [profile,setProfile]=useState(null)
//     const [loading,setLoading]=useState(true)
//     const [user,SetUser]=useState()
//     const [isEdit,setIsEdit]=useState(false)
//     const [formData,setFormData]=useState({
//         "full_name":"",
//         "phone":"",
//         "dob":"",
//         "gender":"",
//         "location":""
//     })
//     const token=localStorage.getItem('accessToken')

//     useEffect(()=>{
//             const fetchProfile=async()=>{
//                 try{
//                     console.log("1-token===",token);
                    
//                     const res=await axios.get('http://127.0.0.1:8000/user/profile/',{
//                         headers:{
//                             Authorization:`Bearer ${token}`
//                         }
//                     });
//                     console.log("2");
//                     setProfile(res.data);
//                     setFormData({
//                         full_name: res.data.full_name || '',
//                         phone: res.data.phone || '',
//                         dob: res.data.dob || '',
//                         gender: res.data.gender || '',
//                         location: res.data.location || ''
//                     });
//                     console.log('profilr==',res.data);
//                     const response=await axios.get('http://127.0.0.1:8000/user/self/',{
//                         headers:{
//                             Authorization:`Bearer ${token}`
//                         }
//                     });
//                     SetUser(response.data);
//                     console.log('custom user==',response.data); 
//                 }catch(error){
//                     console.log('error==',error);    
//                 }finally{
//                     setLoading(false)
//                 }
//             }
//             fetchProfile();
        
//     },[])
//     const handlechange=(e)=>{
//         const {name,value}=e.target;
//         setFormData((prev)=>({
//             ...prev,
//             [name]:value
//         }));
//     }
//     const handleSubmit=async(e)=>{
//         e.preventDefault()
//         const token=localStorage.getItem('accessToken');
//         try {
//             console.log("ttt=",token);
//             console.log('new formdata==',formData);
//             if (isEdit){
//                 const resUpdate=await axios.patch("http://127.0.0.1:8000/user/profile/",
//                     formData,
//                     {
//                         headers:{
//                             Authorization:`Bearer ${token}`
//                         }
//                     }
//                 )
//                 alert("profile updated successfully")
//                 console.log("formfaya",formData);
//                 setIsEdit(false) 
//                 window.location.reload()
//             }
//             else{
//                 const res=await axios.post("http://127.0.0.1:8000/user/profile/",
//                     formData,
//                     {
//                         headers:{
//                            Authorization:`Bearer ${token}`
//                         }
//                     }
//                 )
//                 alert("profile created successfully")
//                 console.log("formfaya",formData);
//             }  
//         } catch (error) {
//             alert("profile create failed..")
//         }
//     }
//     const handleEdit=()=>{
//         setIsEdit(true);
//         console.log('edit data');
//         console.log(isEdit);    
//     }
    
    
//   if (loading){
//     return(
//         <h1>loading....</h1>
//     )
//   }  
//   if (!profile){
//     return(
//         <div>
//             <h1>no profile found, create ur profile</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type='text' name='full_name' value={formData.full_name} onChange={handlechange}  placeholder='full name'></input>
//                 <input type='text' name='phone' value={formData.phone} onChange={handlechange}  placeholder='phone number'></input>
//                 <input type='date' name='dob' value={formData.dob} onChange={handlechange}  placeholder='date of birth'></input>
//                 <input type='text' name='location' value={formData.location} onChange={handlechange}  placeholder='location'></input>
//                 <select
//                    name="gender"
//                    value={formData.gender}
//                    onChange={handlechange}
//                 >
//                    <option value={""}>select gender</option>
//                    <option value={"M"}>male</option>
//                    <option value={"F"}>female</option>
//                    <option value={"O"}>other</option>
//                 </select>
//                 <button type='submit'>Submit</button>
//            </form>
//         </div>

//     )
//   }  
   
//   if (isEdit){
//     return(
//     <div>
//         <h1>edit profile</h1>
//         <form onSubmit={handleSubmit}>
//                 <input type='text' name='full_name' value={formData.full_name} onChange={handlechange}  placeholder='full name'></input>
//                 <input type='text' name='phone' value={formData.phone} onChange={handlechange}  placeholder='phone number'></input>
//                 <input type='date' name='dob' value={formData.dob} onChange={handlechange}  placeholder='date of birth'></input>
//                 <input type='text' name='location' value={formData.location} onChange={handlechange}  placeholder='location'></input>
//                 <select
//                    name="gender"
//                    value={formData.gender}
//                    onChange={handlechange}
//                 >
//                    <option value={''}>select gender</option>
//                    <option value={"M"}>male</option>
//                    <option value={"F"}>female</option>
//                    <option value={"O"}>other</option>
//                 </select>
//                 <button type='submit'>Submit</button>

//         </form>
//     </div>
//     )
//   }
    
//   return  (
//     <div>
//         <h1>profile page</h1>
//         <h1>name={profile.full_name}</h1>
//         <h1>phone={profile.phone}</h1>
//         <h1>email={user.email}</h1>
//         <h1>dob={profile.dob}</h1>
//         <h1>location={profile.location}</h1>
//         <h1>gender={profile.gender}</h1>
//         <button onClick={handleEdit}>Edit</button>
//    </div>
//   )
// }

// export default UserProfile







// =============================================================================================






// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProfile, createProfile, updateProfile, clearCreated } from '../../store/profileSlice';

// function UserProfile() {
//   const dispatch = useDispatch();
//   const { data: profile, loading, error, created } = useSelector((state) => state.profile);
//   const [isEdit, setIsEdit] = useState(false);
//   const [formData, setFormData] = useState({
//     full_name: '',
//     phone: '',
//     dob: '',
//     gender: '',
//     location: ''
//   });

//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         full_name: profile.full_name || '',
//         phone: profile.phone || '',
//         dob: profile.dob || '',
//         gender: profile.gender || '',
//         location: profile.location || ''
//       });
//     }
//   }, [profile]);

//   useEffect(() => {
//     if (created) {
//       alert('Profile created successfully!');
//       dispatch(clearCreated());
//     }
//   }, [created, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isEdit) {
//       await dispatch(updateProfile(formData));
//       alert('Profile updated successfully!');
//       setIsEdit(false);
//     } else {
//       await dispatch(createProfile(formData));
//     }
//   };

//   if (loading) return <h1>Loading...</h1>;
//   if (error) return <h1>Error: {error}</h1>;

//   if (!profile) {
//     return (
//       <div>
//         <h1>No profile found, create your profile</h1>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full name" />
//           <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" />
//           <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of birth" />
//           <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select gender</option>
//             <option value="M">Male</option>
//             <option value="F">Female</option>
//             <option value="O">Other</option>
//           </select>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }

//   if (isEdit) {
//     return (
//       <div>
//         <h1>Edit Profile</h1>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full name" />
//           <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" />
//           <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of birth" />
//           <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select gender</option>
//             <option value="M">Male</option>
//             <option value="F">Female</option>
//             <option value="O">Other</option>
//           </select>
//           <button type="submit">Save</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <h1>Name: {profile.full_name}</h1>
//       <h1>Phone: {profile.phone}</h1>
//       <h1>DOB: {profile.dob}</h1>
//       <h1>Location: {profile.location}</h1>
//       <h1>Gender: {profile.gender}</h1>
//       <button onClick={() => setIsEdit(true)}>Edit</button>
//     </div>
//   );
// }

// export default UserProfile;












// =======================================================================================================================

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, createProfile, updateProfile, clearCreated } from '../../store/profileSlice';
import { fetchSelfUser } from '../../store/userSlice';

function UserProfile() {
  const dispatch = useDispatch();
  const { data: profile, loading, error, created } = useSelector((state) => state.profile);
  const { data: user, loading: userLoading, error: userError } = useSelector((state) => state.user);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    dob: '',
    gender: '',
    location: ''
  });

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchSelfUser())
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        dob: profile.dob || '',
        gender: profile.gender || '',
        location: profile.location || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (created) {
      alert('Profile created successfully!');
      dispatch(clearCreated());
    }
  }, [created, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateProfile(formData));
      alert('Profile updated successfully!');
      setIsEdit(false);
    } else {
      await dispatch(createProfile(formData));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-8">Create Your Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your Location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
                >
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (isEdit) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
              <button
                onClick={() => setIsEdit(false)}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your Location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome, {profile.full_name?.split(' ')[0] || 'User'}</h1>
          <p className="text-gray-500">last update {profile.updated_at.slice(0,10)}</p>
        </div>

        {/* Gradient Banner */}
        <div className="bg-gradient-to-r from-blue-300 via-purple-200 to-yellow-200 h-24 rounded-lg mb-8"></div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-600">
                  {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{profile.full_name || 'User Name'}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Edit
            </button>
          </div>

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                {profile.full_name || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                {user.email || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                {profile.phone || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                {profile.dob || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                {profile.location || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                {profile.gender === 'M' ? 'Male' : profile.gender === 'F' ? 'Female' : profile.gender === 'O' ? 'Other' : 'Not specified'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;