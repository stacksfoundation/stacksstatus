import '../styles/globals.css'
import '../styles/globals.css'

// var runChecks = require('../components/run_checks');
// import '../components/run_checks'

function MyApp({ Component, pageProps }) {
  // Promise.all([runChecks()]).then((val) => {
  //     runChecks = val[0];
  //     console.log(runChecks);
  //     // Aafter completed this code will be called
  //     // let users = GetUser(service);
  //     // let users = GetAdress(process);
  //     console.log('I am called after all promises completed.')
  // });
  return <Component {...pageProps} />
}

export default MyApp
