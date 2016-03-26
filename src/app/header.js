import React, {Component} from 'react';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#26d9de'
  },
  title: {
    flex: 1,
    fontSize: '1.5rem',
    margin: '1rem'
  },
  date: {
    flex: 1,
    textAlign: 'right',
    margin: '1rem'
  }
};

export class Header extends Component {
  render() {
    return (
      <header style={styles.header}>
        <p style={styles.title}>
          <a href="https://github.com/FountainJS/generator-fountain-webapp" target="_blank">
            Foutain Generator
          </a>
        </p>
        <p style={styles.date}>
          Generated with FountainJS v0.2.2 on Sat Mar 26 2016 15:14:36 GMT+0100 (CET)
        </p>
      </header>
    );
  }
}
