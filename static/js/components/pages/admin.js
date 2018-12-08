import React from 'react';
import {Route} from 'react-router-dom';
import News from './news';

const Admin = (props) => {
    const { postNews, News, deleteNew, account } = props;
    let newAuthor = '';
    let newTitle = '';
    let newText = '';
    return (
        <div>
            <p>
                <input type="text" 
                       placeholder="Автор"
                       value={ account.fio }
                       readOnly
                       ref={(input) => newAuthor = input}/>
            </p>
            <p>
                <input type="text" 
                       placeholder="Заголовок"
                       defaultValue={ newTitle }
                       ref={(input) => newTitle = input}/>
            </p>
            <p>
                <textarea type="text" 
                       placeholder="Сообщение"
                       cols="100"
                       rows="30"
                       defaultValue={ newText }
                       ref={(input) => newText = input}/>
            </p>
            <button onClick={ev => postNews(newAuthor, newTitle, newText)}>Отпубликовать</button>
            <table>
                <tbody>
                    {News.map((newElement) => 
                        <tr key={newElement.id}>
                            <td>{newElement.title}</td>
                            <td>{newElement.text}</td>
                            <td><button onClick={ev => deleteNew(newElement.id)}>Удалить</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;