import React, { Component } from 'react';


export class Soon extends Component {

    render() {
        return (
            <div style = {{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <iframe width="560"
                        height="315"
                        src="https://www.youtube.com/embed/Mof2D9bB5uU"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen>
                </iframe>

            </div>
        );
    }
}
