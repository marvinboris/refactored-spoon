import React from 'react';

import '../../../../../../public/css/star-rating-svg.css';

export default ({ mark, readOnly }) => <div className={readOnly ? "read-only-stars" : "ranking-stars"} data-rating={mark} />;