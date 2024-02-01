import React from "react";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";

const Ptf = () => {
  return (
    <div className="outlet">
      <Card title="VOS PORTEFEUILLES"></Card>
      <section>
        <Card title="CLASSES D'ACTIF"></Card>

        <Card title="DEVISES"></Card>
      </section>
      <Card title="OPERATIONS"></Card>
      <Footer />
    </div>
  );
};

export default Ptf;
