import React from 'react';

import Footer from '../../components/Footer/Footer';

export default ({ children }) => <div className="min-vh-100 d-flex flex-column bg-snow">
    <main className="flex-fill container pt-5 d-flex flex-column">{children}</main>
    <Footer />
</div>;