import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Comment from '../../components/sample/Comment';

const CommentPage = () => {
    //script

    const [comments, setComments] = useState([]); //=> 배열로 초기화 ([])
    
    //let comments = [];
    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const response = await api.get('/comment');

    //             console.log('debug >>>> response', response.data);

    //             setComments(response.data);
    //         } catch (err) {
    //             console.log('debug >>>> err', err);
    //         }
    //     };

    //     loadData();
    // }, []);

    // console.log(`debug >>>> CommentPage load event `);
    // let comments = [
    //     {
    //         "writer"  : "임정섭",
    //         "comment" : "강사님과 함께하는 즐거운 React..."
    //     },
    //     {
    //         "writer"  : "차현준",
    //         "comment" : "강사님과 함께하는 재미없는 React..."
    //     },
    //     {
    //         "writer"  : "박선아",
    //         "comment" : "강사님과 함께하는 즐겁지아니한 React..."
    //     }
    // ] ;


    const loadData = async () => {
        await api.get('/comment')
            .then(response => {
                console.log(`debug >>>> response `, response.data);
                setComments(response.data);
            })
            .catch(err => {
                console.log(`debug >>>> err `, err);
            });
    }

    useEffect(() => {
        loadData();
    }, []);

    //UI
    return (
        <div>
            {
                comments.map((comment, idx) => {
                    return (
                        <Comment
                            key={idx}
                            data={comment}
                        />
                    );
                }) // ?? [] => 이 방법도 가능
            }
        </div>
    );
};

export default CommentPage;