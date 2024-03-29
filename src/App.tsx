import './App.css';
import {useEffect, useState} from 'react'; 
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
import UserPage from './Pages/User/User';
import NotFoundPage from './Pages/NotFound/NotFound';
import { useCookies } from 'react-cookie';
import authCheck from './Utils/AuthCheck';
import LoginPage from './Pages/Login/Login';
import ProjectPage from './Pages/Project/Project';
import ProjectCreatePage from './Pages/ProjectCreate/ProjectCreate';
import TeamPage from './Pages/Team/Team';
import RegisterPage from './Pages/Register/Register';
import WorkersAttendancePage from './Pages/WorkersAttendance/WorkersAttendance';
import ProjectEditPage from './Pages/ProjectEdit/ProjectEdit';
import ProjectsListPage from './Pages/ProjectsList/ProjectList';
import TaskPage from './Pages/Task/Task';
import SchedulePage from './Pages/Schedule/Schedule';
import TeamsListPage from './Pages/TeamList/TeamList';
import { AuthorizationCookieKey } from './Utils/Consts';
import NavbarComponent from './Components/Navbar/Navbar';
import { NavigationCategoryTypes } from './Utils/Types';
import { UserControllersApi, UserModel } from 'task-manager';
import { ApiConfig, removeToken, setAccessTokenForClient } from './Gateway/Config';
import UserEditPage from './Pages/UserEdit/UserEdit';

function App() {	
	const [cookies, setCookies, removeCookies] = useCookies([AuthorizationCookieKey]);
	const navigate = useNavigate() 
	const [navigationCategory, setNavigationCategory] = useState<NavigationCategoryTypes>("nochoice")
	const [currentUser, setCurrentUser] = useState<UserModel>(); 
	const location = useLocation()
	const { hash, pathname, search } = location;

	const localAuthCheck = () => { 
		return authCheck(navigate, cookies)
	}

	const localRegisteredCheck = async () => { 
		if (cookies.Authorization !== undefined || cookies.Authorization !== "" || cookies.Authorization !== null) { 
			navigate("/login")
		}
	}

	useEffect(() => { 
		setAccessTokenForClient(cookies.Authorization); 
		let userApi = new UserControllersApi(ApiConfig)
		userApi.getMe()
			.then((value) => {
				setCurrentUser(value.data)
				setAccessTokenForClient(cookies.Authorization)
			})
			.catch((error) => {
				if (pathname !== "/login" && pathname !== "/register") { 
					navigate("/login")
				} 
				if (error.response) { 
					if (error.response.status === 400) { 
						removeToken(removeCookies)
					} 	
				} 
			})
	}, [cookies.Authorization]) 
	return (
		<div>
			<NavbarComponent navigationCategory={navigationCategory} user={currentUser}/>
			<div className='content'>
				<Routes>
					<Route path="/login" element={<LoginPage setCategory={setNavigationCategory} user={currentUser} />} action={localRegisteredCheck}/>
					<Route path="/register" element={<RegisterPage  setCategory={setNavigationCategory} user={currentUser}/>} action={localRegisteredCheck}/>
					<Route path="/" element={<HomePage  setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/home" element={<HomePage  setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/user/:id" element={<UserPage  setCategory={setNavigationCategory} user={currentUser} />} action={localAuthCheck}/>
					<Route path="/user/:id/edit" element={<UserEditPage setCategory={setNavigationCategory} user={currentUser} />} action={localAuthCheck}/>
					<Route path="/project/:id" element={<ProjectPage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/> 
					<Route path='/project/:id/edit' element={<ProjectEditPage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/project/create" element={<ProjectCreatePage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path='/project/:projectId/task/:taskId' element={<TaskPage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/> 
					<Route path="/projects" element={<ProjectsListPage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/teams" element={<TeamsListPage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path='/task/:taskId' element={<TaskPage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/> 
					<Route path="/team/:id" element={<TeamPage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/team/:id/attendance" element={<WorkersAttendancePage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path='/team/:id/schedule' element={<SchedulePage setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="*" element={<NotFoundPage setCategory={setNavigationCategory} user={currentUser}/>}/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
