import './scss/main.scss';
import TitleComponent from './components/TitleComponent';
import SliderComponent from "./components/SliderComponent.tsx";
import HeaderComponent from "./components/HeaderComponent.tsx";
import {SliderProvider} from "./contexts/SliderContext.tsx";
import ProjectsContainer from "./components/ProjectsContainer.tsx";
import OverlayedButton from "./components/buttons/OverlayedButton.tsx";

function App() {

    return (
        <div className="page-container">
            <HeaderComponent/>
            <TitleComponent/>
            <SliderProvider>
                <div className="main-content-container">
                    <div className="description-container">
                        <p className="description">
                            I'm a student in computer science and I'm passionate about web
                            development. I'm always looking for new projects to work on and
                            new technologies to learn. I'm currently studying at the
                            University of Strasbourg and I'm looking for an internship in web
                            development. I'm also available for freelance work so please feel
                            free to contact me if you need a website or a web application !
                        </p>
                    </div>
                    <div className="featured projects-container">
                        <h2><strong>Featured projects</strong></h2>

                        <SliderComponent stateA="School" stateB="Personal" type="featured"/>
                        <ProjectsContainer type="featured"/>
                    </div>
                    <div className="other projects-container">
                        <h2><strong>Other projects</strong></h2>

                        <SliderComponent stateA="In Progress" stateB="Drafts" type="other"/>
                        <ProjectsContainer type="other"/>
                    </div>
                </div>
            </SliderProvider>
            <footer>
                <div className="footer-container">
                    <div className="contact-container">
                        <h3>Like what I do ?</h3>
                        <p>I can create <strong>your</strong> website !</p>
                        <OverlayedButton text={"Contact me"} className={"contact-button"} to={"contact/"}/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
