import React from 'react';
import {useParams} from "react-router";


const CreateComponent = (props) => {
    const {id} = useParams();
    const {fire} = props;
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [meal, setMeal] = React.useState(null);

    const db = fire.firestore();

    const sendToFirestore = () => {
        if (!id) {
            // create
            db.collection('recipes').add({
                description: description,
                title: title,
                image: image,
            })
        } else {
            // update
            db.collection('recipes').doc(id).set({
                description: description,
                title: title,
                image: image,
            })
        }
    };

    const deleteFromFirestore = () => {
        db.collection('recipes').doc(id).delete();
    }

    React.useEffect(() => {
        const asyncCall = () => {
            if (fire && id) {
                fire.firestore().collection('recipes').doc(id).get().then((doc) => {
                    const data = doc.data();

                   setMeal({
                       id: doc.id,
                       title: data.title,
                       description: data.description,
                       image: data.image,
                   });

                   setTitle(data.title);
                   setImage(data.image);
                   setDescription(data.description);
                })
            }
        }
        return asyncCall();
    }, [fire]);

    return (
        <div>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={sendToFirestore}>SAVE</button>
            {id && <button onClick={deleteFromFirestore}>DELETE</button>}
        </div>
    );
};

export default CreateComponent;