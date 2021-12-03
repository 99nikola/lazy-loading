import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import "./app.css";


const App: React.FC = () => {

	const [ render, setRender ] = useState<React.ReactElement>(<></>);

	const handleLoad = () => (
		import("./components/templates/Sidebar")
			.then(({ default: Sidebar}) => {
				setRender(<Sidebar className="sidebar" />);
			})
	);

	return (
	<>
		<input id="sidebar" type="checkbox" />
		{render}

		<div className="menu-button-container">
			<label htmlFor="sidebar" onClick={handleLoad}>
				<MenuIcon
					id="menu-icon"
					/>
			</label>
		</div>
	</>
	);
}

export default App;
