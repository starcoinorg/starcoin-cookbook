import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Getting started with starcoin CLI',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
          Learn how to install starcoin and use starcoin's CLI and participate in a network
      </>
    ),
  },
  {
    title: 'Move language and SmartContract Development',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
          Learn how to use Move language and starcoin-framework to write SmartContract
      </>
    ),
  },
  {
    title: 'Web3 and DApp Development',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn how to build DApp on starcoin
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
