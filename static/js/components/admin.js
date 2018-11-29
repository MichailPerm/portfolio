import React from 'react';

const Admin = (props) => {
    const { postNews } = props;
    let newAuthor = '';
    let newTitle = '';
    let newText = '';
    return (
        <div>
            <p>
                <input type="text" 
                       placeholder="Автор"
                       defaultValue={ newAuthor }
                       ref={(input) => newAuthor = input}/>
            </p>
            <p>
                <input type="text" 
                       placeholder="Заголовок"
                       defaultValue={ newTitle }
                       ref={(input) => newTitle = input}/>
            </p>
            <p>
                <input type="text" 
                       placeholder="Сообщение"
                       defaultValue={ newText }
                       ref={(input) => newText = input}/>
            </p>
            <button onClick={ev => postNews(newAuthor, newTitle, newText)}>Отпубликовать</button>
        </div>
    );
};

export default Admin;