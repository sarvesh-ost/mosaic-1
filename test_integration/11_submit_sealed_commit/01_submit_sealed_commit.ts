import shared from "../shared";
import Utils from "../Utils";

describe('Committee::submitSealedCommit', async () => {

  it('should submit Sealed Commit for all members in the committee', async () => {

    const secret = shared.data.committeeLockSecret;
    const committee = shared.origin.contracts.Committee.instance;

    const validators = shared.origin.keys.validators;
    const members = await committee.methods.getMembers().call();

    for (let i = 0; i < members.length; i++) {

      let committeeMember = validators.filter(
        validator => validator.address === members[i],
      );

      if (committeeMember.length == 0) {
        continue;
      }

      const salt = shared.origin.web3.utils.randomHex(32);
      committeeMember[0].position = secret;
      committeeMember[0].salt = salt;

      const sealedCommit = await committee.methods.sealPosition(
        committeeMember[0].position,
        committeeMember[0].salt,
      ).call();

      await Utils.sendTransaction(
        committee.methods.submitSealedCommit(sealedCommit),
        {from: members[i]},
      );
    }
  });
});
