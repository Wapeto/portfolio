import React, {useState} from 'react';
import axios from 'axios';
import OverlayedButton from "../components/buttons/OverlayedButton.tsx";
import SVGButton from "../components/buttons/SVGButton.tsx";
import ArrowLeftIcon from "../assets/icons/ArrowLeftIcon.tsx";

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            name,
            email,
            message
        };

        await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, data);

        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div id={"contact-page"}>
            <div className="header">
                <SVGButton text={"Home"} SvgIcon={ArrowLeftIcon} to={"/"} className={"home-button"}/>
            </div>
            <h1>Contact me</h1>
            <div className={"form-container"}>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name"
                           required/>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                           required/>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message"
                              required/>
                    <OverlayedButton text={"Send"} className={"send-button"} type={"submit"}/>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;