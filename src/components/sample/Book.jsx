import '../../styles/book.css';
import placeholder from '../../img/placeholder.jpeg';

const Book = ({book}) => {
    return (
        <div className='wrapper'>
            <div>
                <img src={placeholder}
                    className='image'></img>
            </div>
            <div>
                <span>책 이름 : {book.bookName}</span> <p/>
                <span>책 가격 : {book.price}</span>
            </div>
        </div>
    );
}

export default Book;

// const Book = ({ bookName, price }) => {
//   return (
//     <div className="wrapper">
//       <div>
//         <img
//           src={placeholder}
//           className="image"
//           alt={bookName}
//         />
//       </div>

//       <div>
//         <span>책 이름 : {bookName}</span>
//         <p />
//         <span>책 가격 : {price}</span>
//       </div>
//     </div>
//   );
// };  이런식으로도 가능

// const Book = ({ book }) => {
//   return (
//     <div className='wrapper'>
//       <div>
//         <img
//           src={placeholder}
//           className='image'
//         ></img>
//       </div>

//       <div>
//         <span>책 이름 : {book.bookName}</span><p/>
//         <span>책 가격 : {book.price}</span>
//       </div>
//     </div>
//   );
// }; 이런식으로도 가능
