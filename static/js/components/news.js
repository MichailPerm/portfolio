import React from 'react';

const News = (props) => {
    const { News } = props;

    return (
        <div>
            <ul>
                {News.map((newsElement) => 
                    <li key = {newsElement.id}>{newsElement.text}</li>
                )}
            </ul>
        </div>
    );
};

export default News;