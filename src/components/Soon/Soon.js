import React, { Component } from 'react';

export class Soon extends Component {

    render() {
        return (
            <div style = {{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ height: '400px', width: '600px', display: 'inline-block', position: 'relative'}}>
                    <div style={{ height: '400px', width: '600px', overflow: 'hidden', borderRadius: '5000px', position: 'absolute'}}>
                        <iframe width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/Mof2D9bB5uU?modestbranding=1&autohide=1&showinfo=0&controls=0"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>
        );
    }
}
