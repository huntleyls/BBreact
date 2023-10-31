/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const firestore = admin.firestore();

exports.clearLineTimes = functions.pubsub
  .schedule("0 5 * * *")
  .timeZone("America/New_York") // Set time zone to Eastern Time (EST)
  .onRun(async (context: functions.EventContext): Promise<void> => {
    const lineTimesRef = firestore.collection("linetimes");
    const snapshot = await lineTimesRef.get();

    const batch = firestore.batch();

    snapshot.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      batch.update(doc.ref, {
        hours: 0,
        minutes: 0,
      });
    });

    await batch.commit();
    console.log("Set hours and minutes to zero for all documents in linetime.");
    return;
  });
