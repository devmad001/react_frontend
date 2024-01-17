/* eslint-disable array-callback-return */
import React, { FC, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Chip } from '@mui/material';
import HeaderHome from '../../components/HeaderHome';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
// import { enterpriseCards } from '../../constants/cardsData';
import { chipStyles, chipStylesResources } from '../../constants/styles/chip';
import styles from './ResourcesPage.module.scss';
import WaveUp from '../../assets/VectorUp.svg';
import WaveDown from '../../assets/VectorDown.svg';
import Doodle from '../../assets/Doodle.svg';

import BlogService from '../../services/BlogService';
import { IBlog } from '../../types/blogTypes';

const ResourcesPage: FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState<IBlog[]>([]);
  useEffect(() => {
    setLoading(true);
    async function fetchblog() {
      const mblogData: Array<IBlog> = await BlogService.getBlogs(filter);
      setBlogData(mblogData);
      setLoading(false);
    }
    fetchblog();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchblog() {
      const mblogData: Array<IBlog> = await BlogService.getBlogs(filter);
      setBlogData(mblogData);
      setLoading(false);
    }
    if (filter) fetchblog();
  }, [filter]);

  const handleClick = (param: string) => {
    navigate(`/resources/${param}`);
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    if (contentRef.current) {
      const content = contentRef.current;
      const isFound = window.find(query);

      if (isFound) {
        content.focus();

        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          const range = document.createRange();
          range.selectNodeContents(content);
          // selection.addRange(range);
          selection.removeAllRanges();
        }
      }
    }
  };
  if (loading) return <Loader />;
  return (
    <>
      <Helmet>
        <title>Our Stories and News - IDF Foundation Updates</title>
        <meta
          name="description"
          content="Stay informed with the latest stories and news from IDF Foundation. Explore our updates, events, and important information about our organization."
        />
      </Helmet>
      <HeaderHome onSearch={handleSearch} />
      <main
        ref={contentRef}
        style={{
          maxWidth: '1440px',
          background: '#f8f8f8',
          position: 'relative',
        }}
      >
        <section className={styles.storiesSection}>
          <h2 className={styles.storiesTitle}>Our stories and news</h2>
          <div className={styles.chipContainer}>
            <Chip
              clickable
              label="Participant Stories"
              variant="outlined"
              sx={chipStylesResources}
              onClick={() => {
                setFilter('Participant');
                // navigate('/support');
                // window.scrollTo(0, 0);
              }}
            />
            <Chip
              clickable
              label="Business Services"
              variant="outlined"
              sx={chipStyles}
              onClick={() => {
                setFilter('Business');
                // navigate('/business-services');
                // window.scrollTo(0, 0);
              }}
            />
            <Chip
              clickable
              label="Social Enterprise"
              variant="outlined"
              sx={chipStyles}
              onClick={() => {
                setFilter('Social');
                // navigate('/social-enterprise');
                // window.scrollTo(0, 0);
              }}
            />
            <Chip
              clickable
              label="Corporate News"
              variant="outlined"
              sx={chipStyles}
              onClick={() => {
                setFilter('Corporate');
                // navigate('/corporate-news');
                // window.scrollTo(0, 0);
              }}
            />
          </div>
          <div className={styles.socialEnterprise}>
            {filter === ''
              ? blogData.map((item, index) => {
                  if (index === 0) {
                    return (
                      <div className={styles.enterpriseCard} key={item.id}>
                        <div className={styles.enterpriseImgContainer}>
                          <img src={item.img} alt="enterprise" />
                        </div>
                        <span className={styles.label}>{item.label}</span>
                        <h6 className={styles.title}>{item.title}</h6>
                        <p
                          className={styles.learnMore}
                          onClick={() =>
                            handleClick(`${item.category}/${item.id}`)
                          }
                        >
                          Learn More
                        </p>
                      </div>
                    );
                  }
                })
              : blogData
                  .filter(article => article.category === filter)
                  .map(item => (
                    <div className={styles.enterpriseCard} key={item.id}>
                      <div className={styles.enterpriseImgContainer}>
                        <img src={item.img} alt="enterprise" />
                      </div>
                      <span className={styles.label}>{item.label}</span>
                      <h6 className={styles.title}>{item.title}</h6>
                      <p
                        className={styles.learnMore}
                        onClick={() =>
                          handleClick(`${item.category}/${item.id}`)
                        }
                      >
                        Learn More
                      </p>
                    </div>
                  ))}

            <div className={styles.rightWrapper}>
              {blogData.map((item, index) => {
                if (filter !== item.category) {
                  return (
                    <div className={styles.enterpriseCardSmall} key={item.id}>
                      <span className={styles.label}>{item.label}</span>
                      <div className={styles.enterpriseImgContainerSmall}>
                        <img src={item.img} alt="enterprise" />
                      </div>

                      <h6 className={styles.title}>{item.title}</h6>
                      <p
                        className={styles.learnMore}
                        onClick={() =>
                          handleClick(`${item.category}/${item.id}`)
                        }
                      >
                        Learn More
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className={styles.socialEnterpriseResponsive}>
            {blogData.map(item => (
              <div className={styles.enterpriseCard} key={item.id}>
                <div className={styles.enterpriseImgContainer}>
                  <img src={item.img} alt="enterprise" />
                </div>
                <span className={styles.label}>{item.label}</span>
                <h6 className={styles.title}>{item.title}</h6>
                {/* <p className={styles.learnMore}>Learn More</p> */}
              </div>
            ))}
          </div>
          <div className={styles.waveContainer}>
            <img src={WaveUp} alt="wave" />
            <img src={WaveDown} alt="wave" />
          </div>
          <div className={styles.doodleContainer}>
            <img src={Doodle} alt="doodle" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResourcesPage;
