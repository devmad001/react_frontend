import React, { FC, ReactNode } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ResourcesPage from '../pages/ResourcesPage';
import ParticipantStories from '../pages/ParticipantStories';
import BusinessServices from '../pages/BusinessServices';
import SocialEnterprise from '../pages/SocialEnterprise';
import CorporateNews from '../pages/CorporateNews';
import RealEstateServices from '../pages/RealEstateServices';
import SocialMediaPage from '../pages/SocialMediaPage';
import EmploymentHub from '../pages/EmploymentHub';
import ActivityHub from '../pages/ActivityHub';
import BusinessHub from '../pages/BusinessHub';
import ContactUsPage from '../pages/ContactUs';
import NDISPrivacy from '../pages/NdisPrivacy';
import TaxReceipts from '../pages/TaxReceipts';
import RefundPolicy from '../pages/RefundPolicy';
import WebsiteDisclaimer from '../pages/WebsiteDisclaimer';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AdvocacyPage from '../pages/Advocacy';
import DetailsPage from '../pages/DetailsPage';
import NeuroInclusiveMindset from '../pages/NeuroInclusiveMindset';
import NeurodiverseWorkforce from '../pages/NeurodiverseWorkforce';
import NeurodiversityHire from '../pages/NeurodiversityHire';
import ESports from '../pages/ESports';
import SpeciallyMade from '../pages/SpeciallyMade';
import Hamper from '../pages/Hamper';
import ExpansiveNetwork from '../pages/ExpansiveNetwork';
import LatestJobs from '../pages/LatestJobs';
import EmploymentAdvice from '../pages/EmploymentAdvice';
import SupportForBusinessOwners from '../pages/SupportForBusinessOwners';
import UpdatedWithEvents from '../pages/UpdatedWithEvents';
import ContactCoordinator from '../pages/ContactCoordinator';
import DonatePage from '../pages/DonatePage';
import VolunteerPage from '../pages/VolunteerPage';
import SuccessPage from '../pages/SuccessPage';
import FailurePage from '../pages/FailurePage';
import GamingHub from '../pages/GamingHub';
import PackingPage from '../pages/PackingPage';
import Layout from '../components/Layout';
interface MyComponentProps {
  children: ReactNode;
}

const ScrollToTop: FC<MyComponentProps> = ({ children }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // window.scrollTo(0, 0);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return <>{children}</>;
};

const RoutesApp: FC = () => {
  return (
    <ScrollToTop>
      <Layout>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/restaurant-services" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<ParticipantStories />} />
          <Route path="/business-services" element={<BusinessServices />} />
          <Route path="/social-enterprise" element={<SocialEnterprise />} />
          <Route path="/corporate-news" element={<CorporateNews />} />
          <Route
            path="/real-estate-services"
            element={<RealEstateServices />}
          />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/employment-hub" element={<EmploymentHub />} />
          <Route path="/activity-hub" element={<ActivityHub />} />
          <Route path="/business-hub" element={<BusinessHub />} />
          <Route path="/gaming-hub" element={<GamingHub />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/ndis-privacy" element={<NDISPrivacy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/tax-receipts" element={<TaxReceipts />} />
          <Route path="/website-disclaimer" element={<WebsiteDisclaimer />} />
          <Route path="/advocacy" element={<AdvocacyPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:category/:id" element={<DetailsPage />} />
          <Route
            path="/neuro-inclusive-mindset"
            element={<NeuroInclusiveMindset />}
          />
          <Route
            path="/neurodiverse-workforce"
            element={<NeurodiverseWorkforce />}
          />
          <Route
            path="/neurodiversity-hire-process"
            element={<NeurodiversityHire />}
          />
          <Route path="/e-sports" element={<ESports />} />
          <Route path="/specially-made" element={<SpeciallyMade />} />
          <Route path="/packing" element={<PackingPage />} />
          <Route path="/hamper" element={<Hamper />} />
          <Route path="/expansive-network" element={<ExpansiveNetwork />} />
          <Route path="/latest-jobs" element={<LatestJobs />} />
          <Route path="/employment-advice" element={<EmploymentAdvice />} />
          <Route
            path="/support-for-business-owners"
            element={<SupportForBusinessOwners />}
          />
          <Route
            path="/keep-updated-with-events"
            element={<UpdatedWithEvents />}
          />
          <Route
            path="/contact-to-coordinator"
            element={<ContactCoordinator />}
          />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/success_donation" element={<SuccessPage />} />
          <Route path="/failure_donation" element={<FailurePage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
        </Routes>
      </Layout>
    </ScrollToTop>
  );
};

export default RoutesApp;
