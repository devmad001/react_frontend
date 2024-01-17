import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IImpactCard } from '../../types/cardType';
import styles from './ImpactCard.module.scss';
import ModalParticipantCard from '../ModalParticipantCard';
import ModalSchoolLeavers from '../ModalSchoolLeavers';

const ImpactCard: FC<IImpactCard> = ({ title, img, link , modalTitles}) => {
  const navigate = useNavigate();
   const { pathname } = useLocation();
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img src={img} alt="img" />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.cardTitle}>{title}</p>
        {pathname === "/" ? (<div className={styles.modalContainer}>
          <ModalParticipantCard btnTitle='Learn More >' title={title} />
          <ModalSchoolLeavers btnTitle='School Leavers >' title={title} />
         
        </div>) :
          <button
          className={`${pathname === "/advocacy" ? styles.btnAdvocacy : styles.btn}`}
          onClick={() => {
            navigate(`${link}`);
            window.scrollTo(0, 0);
          }}
        >
          Learn More
        </button>}
      </div>
    </div>
  );
};

export default ImpactCard;
