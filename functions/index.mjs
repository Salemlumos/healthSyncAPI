import bcrypt from 'bcrypt';
export default class Functions {

    static  formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
      
        return `${days} days, ${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
      }

    static async encryptPass(pass){
      const encryptedPassword = await bcrypt.hash(pass, 10);
      console.log(encryptedPassword)
      return encryptedPassword;
    }

    static async comparePass(raw, user) {
      try {
          const isMatch = await bcrypt.compare(raw, user);
          return isMatch;
      } catch (err) {
          // Handle errors here
          console.error(err);
          throw err; // You might want to handle errors more gracefully based on your use case
      }
  }
  
    static mergeArraysToCreateObject(classObj){
      const finalObj =Object.keys(classObj).reduce((obj, key, index) => {
        obj[key] = Object.values(classObj)[index];
        return obj;
      }, {})
      return finalObj
    }

}