import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { profile } from "../../slices/userSlice";
import { uploads } from "../../utils/config";

const EditProfile = () => {

    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleFile = (e) => {
        const image = e.target.files[0];
        setPreviewImage(image);
        setProfileImage(image);
    }

    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img className="profile-image" 
                src={
                    previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                }
                alt={user.name}
                />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ''} />
                <input type="email" placeholder="E-mail" disabled value={email || ''} />
                <label>
                    <span>Imagem do perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio || ''} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>
                <input type="submit" value="Atualizar" />
            </form>
        </div>
    );
};

export default EditProfile;