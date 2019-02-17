import React from 'react'

const layout = ({ children }) => (
    <>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main>
            {children}
        </main>
    </>
)

export default layout