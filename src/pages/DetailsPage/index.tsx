import React, { useRef, useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeaderHome from '../../components/HeaderHome';
import Footer from '../../components/Footer';
import { successStoriesBlogs } from '../../constants/blogs/successStories';
import { supportedEmploymentBlogs } from '../../constants/blogs/supportedEmployment';

import styles from './DetailsPage.module.scss';
import detailsImg from '../../assets/detailesImg.webp';
import doodle from '../../assets/Doodle.svg';
import WaveUp2 from '../../assets/VectorUp2.svg';
import WaveDown2 from '../../assets/VectorDown2.svg';
import detailsDataImg from '../../assets/detailesMockedImg.webp';
import textImg from '../../assets/Texts.webp';
import { IBlogProps } from '../../types/blogTypes';
import BlogService from '../../services/BlogService';
import Loader from '../../components/Loader';

const DetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlogProps>({
    id: '',
    title: '',
    text: '',
    description: '',
    title2: '',
    text2: '',
    title3: '',
    text3: '',
    title4: '',
    text4: '',
    title5: '',
    text5: '',
    title6: '',
    text6: '',
    conclusion: '',
  });
  
  const sanitizer = DOMPurify.sanitize;

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

  useEffect(() => {
    setLoading(true);
    async function fetchblog() {
      const mcardData: IBlogProps = await BlogService.getBlog(params.id);
      setBlog(mcardData);
      setLoading(false);
    }
    fetchblog();
  }, []);

  if (loading) <Loader />;

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
      <main ref={contentRef}>
        <section className={styles.titleSection}>
          <div className={styles.detailsImgContainer}>
            <img src={detailsImg} alt="details" />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.detailsTitle}>Social Enterprise</h1>
            <h2 className={styles.detailsSubTitle}>
              Neurodiversity, an asset in Coding and code testing
            </h2>
            <span>An IDF Insight</span>
          </div>
          <div className={styles.doodleImgContainer}>
            <img src={doodle} alt="doodle" />
          </div>
          <div className={styles.waveContainer}>
            <img src={WaveUp2} alt="wave" />
            <img src={WaveDown2} alt="wave" />
          </div>
        </section>
        <section className={styles.descriptionSection}>
          {
            <div key={blog.id}>
              {blog.description && (
                <p className={styles.annotationText}>{blog.description}</p>
              )}
              <div className={styles.gridContainer}>
                <div className={styles.gridCard}>
                  <h3 className={styles.cardTitle}>{blog.title}</h3>
                  <p
                    className={styles.cardText}
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(blog.text),
                    }}
                  />
                </div>
                <div className={styles.gridCard}>
                  <h3 className={styles.cardTitle}>{blog.title2}</h3>
                  <p
                    className={styles.cardText}
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(blog.text2),
                    }}
                  />
                </div>
                <div className={styles.gridCard}>
                  <h3 className={styles.cardTitle}>{blog.title3}</h3>
                  <p
                    className={styles.cardText}
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(blog.text3),
                    }}
                  />
                  <div style={{ marginTop: '60px' }}>
                    <h3 className={styles.cardTitle}>{blog.title4}</h3>
                    <p
                      className={styles.cardText}
                      dangerouslySetInnerHTML={{
                        __html: sanitizer(blog.text4),
                      }}
                    />
                  </div>
                </div>
                <div className={styles.gridCard}>
                  <img src={detailsDataImg} alt="data" />
                </div>
                <div className={styles.gridCard}>
                  {blog.title5 && (
                    <h3 className={styles.cardTitle}>{blog.title5}</h3>
                  )}
                  {blog.text5 && (
                    <p
                      className={styles.cardText}
                      dangerouslySetInnerHTML={{
                        __html: sanitizer(blog.text5),
                      }}
                    />
                  )}
                </div>
              </div>
              <div className={styles.textImgContainer}>
                <img src={textImg} alt="texts" />
              </div>
              <p className={styles.annotationText}>{blog.conclusion}</p>
            </div>
          }
          {/* <p className={styles.annotationText}>
            Neurodiverse individuals often possess cognitive strengths that are
            particularly advantageous in the field of coding. Here are some ways
            in which their neurodivergent traits can enhance their performance:
          </p>
          <div className={styles.gridContainer}>
            <div className={styles.gridCard}>
              <h3 className={styles.cardTitle}>1. Attention to Detail</h3>
              <p className={styles.cardText}>
                Neurodiverse individuals often demonstrate a high level of
                attention to detail. They can spot inconsistencies, errors, and
                patterns that others may overlook. This ability is crucial in
                coding, where even the smallest mistake can lead to significant
                issues in the functionality of software. Their meticulous
                approach to reviewing and debugging code ensures a higher level
                of accuracy and reliability.
              </p>
            </div>
            <div className={styles.gridCard}>
              <h3 className={styles.cardTitle}>2. Pattern Recognition</h3>
              <p className={styles.cardText}>
                Many neurodivergent individuals have an innate talent for
                recognizing patterns and making connections between seemingly
                unrelated pieces of information. In coding, this skill is
                valuable for designing algorithms and optimizing code. They can
                identify repetitive structures and develop efficient solutions,
                streamlining the code development process.
              </p>
            </div>
            <div className={styles.gridCard}>
              <h3 className={styles.cardTitle}>
                3. Intense Focus and Persistence
              </h3>
              <p className={styles.cardText}>
                Neurodiverse individuals often display intense focus and
                perseverance when working on tasks that capture their interest.
                In coding, where complex problems may require hours of dedicated
                effort, this determination is a valuable asset. They can delve
                deep into coding challenges, exploring various possibilities
                until they find the most suitable solutions.
              </p>
              <div style={{ marginTop: '60px' }}>
                <h3 className={styles.cardTitle}>
                  4. Unique Problem-Solving Approaches
                </h3>
                <p className={styles.cardText}>
                  Neurodiverse individuals' atypical thought processes and
                  perspectives lead to unconventional problem-solving
                  approaches. This creative thinking can be instrumental in
                  tackling complex coding challenges that require innovative
                  solutions. Their ability to see problems from different angles
                  may lead to breakthroughs and new ways of approaching coding
                  tasks.
                </p>
              </div>
            </div>
            <div className={styles.gridCard}>
              <img src={detailsDataImg} alt="data" />
            </div>
            <div className={styles.gridCard}>
              <h3 className={styles.cardTitle}>5. Deep Specialization</h3>
              <p className={styles.cardText}>
                Many neurodivergent individuals develop a deep interest in
                specific areas, leading to specialized knowledge and expertise.
                In coding, this can lead to a profound understanding of
                particular programming languages or domains, making them
                invaluable resources in teams with diverse skill sets.
              </p>
            </div>
            <div className={styles.gridCard}>
              <h3 className={styles.cardTitle}>6. Reduced Bias in Code</h3>
              <p className={styles.cardText}>
                Neurodiverse individuals' different cognitive styles can lead to
                diverse perspectives when designing software. This diversity
                helps reduce bias in code, making products more accessible and
                inclusive for a broader range of users.
              </p>
            </div>
          </div>
          <div className={styles.textImgContainer}>
            <img src={textImg} alt="texts" />
          </div>
          <p className={styles.annotationText}>
            Overall, embracing neurodiversity in the field of coding fosters an
            environment where diverse minds come together to create innovative,
            robust, and user-friendly software solutions. By recognizing and
            valuing the unique strengths that neurodiverse individuals bring to
            the table, the tech industry can foster a more inclusive and
            successful coding community..
          </p>
          <p className={styles.aboutText}>
            To find out more about IDF’s Advocacy for ND in the workplace email:
            admin@idfstgeorge.org.au.
          </p> */}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DetailsPage;
