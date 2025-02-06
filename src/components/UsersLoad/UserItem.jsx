import React from 'react';
import { RiFacebookCircleFill } from '@remixicon/react';
import { RiLinkedinBoxFill } from '@remixicon/react';
import { RiInstagramFill } from '@remixicon/react';
import { RiYoutubeFill } from '@remixicon/react';
import { RiAddCircleFill } from '@remixicon/react';
import { RiDeleteBin2Fill } from '@remixicon/react';
import { RiMapPinFill } from '@remixicon/react';

import styles from './UsersLoad.module.scss';
import { format } from 'date-fns';

function UserItem (props) {
    const {
        user: {
            email,
            gender,
            phone,
            picture: { large: src },
            name: { first: firstName, last: lastName },
            location: { city, country, state },
            dob: { age, date: dateOfB },
        },
    } = props;

    return (
        <li className={styles.wrapperContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.userContainer}>
                    <div className={styles.infoContainer}>
                        {/*  */}
                        <div className={styles.imgContainer}>
                            <img src={src} alt={`${firstName} ${lastName}`} />
                        </div>
                        <h3
                            className={styles.name}
                        >{`${firstName} ${lastName}`}</h3>
                        <p className={styles.dob}>
                            {format(dateOfB, 'd MMMM yyyy')}
                        </p>
                        <p className={styles.location}>
                            <RiMapPinFill className={styles.icon} />
                            {`${country},${state},${city}`}
                        </p>
                        <div className={styles.contact}>
                            <span>{phone}</span>
                            <span>{email}</span>
                        </div>
                    </div>
                    <div className={styles.actionsContainer}>
                        <div className={styles.btnContainer}>
                            <button className={styles.btn}>
                                <RiAddCircleFill className={styles.icon} />
                            </button>
                            <button className={styles.btn}>
                                <RiDeleteBin2Fill className={styles.icon} />
                            </button>
                        </div>
                        <div className={styles.social}>
                            <RiFacebookCircleFill className={styles.icon} />
                            <RiLinkedinBoxFill className={styles.icon} />
                            <RiInstagramFill className={styles.icon} />
                            <RiYoutubeFill className={styles.icon} />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default UserItem;
