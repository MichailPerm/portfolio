import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.newAuthor = '';
        this.newTitle = '';
        this.newText = '';
        this.account = this.props.account;
        this.postNews = this.props.postNews;
        this.deleteNew = this.props.deleteNew;
        this.News = this.props.News;
    }

    render () {
        return (
            <div>
                <p>
                    <input type="text" 
                        placeholder="Автор"
                        value={ this.account.fio }
                        readOnly
                        ref={(input) => this.newAuthor = input}/>
                </p>
                <p>
                    <input type="text" 
                        placeholder="Заголовок"
                        defaultValue={ this.newTitle }
                        ref={(input) => this.newTitle = input}/>
                </p>
                <Editor
                    editorState={this.props.editorState}
                    onEditorStateChange={this.props.setEditorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
                <button onClick={ev => this.postNews(this.newAuthor, this.newTitle, 
                    draftToHtml(convertToRaw(this.props.editorState.getCurrentContent())))
                }>Отпубликовать</button>
                <table>
                    <tbody>
                        {this.News.map((newElement) => 
                            <tr key={newElement.id}>
                                <td>{newElement.title}</td>
                                <td>{newElement.text}</td>
                                <td><button onClick={ev => this.deleteNew(newElement.id)}>Удалить</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Admin;