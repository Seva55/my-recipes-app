import React from 'react';
import {useParams} from "react-router";
import '../homePage/HomePage.scss';
import * as url from "url";


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
        <div className= 'home'>
            <h1 style={{fontSize: '25px', color:'#c2d995', marginTop: '50px'}}>Add Your Recipe</h1>
            <div className= 'home-search'>
                <input
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder='Img url ..'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <button className='button' onClick={sendToFirestore}>SAVE</button>
                {id && <button className='button' onClick={deleteFromFirestore}>DELETE</button>}

            </div>


        </div>
    );
};

export default CreateComponent;