import { UsageClient } from '../src/index';
import { expect, assert } from 'chai';
import { describe, before } from 'mocha';
import * as sinon from 'sinon';

const serviceName = 'usage';

afterEach(() => {
  sinon.restore();
});
describe('Usage Client Test Suite:', () => {
  describe('when deleting status', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'delete');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call delete() on the ALClient instance', async() => {
      await UsageClient.deleteStatus('1234', '0987', '2019', '05', '13', 'paused');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when listing account status', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.listAccountStatus('1234');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when listing account environment status', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.listAccountEnvironmentStatus('1234', '0987');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when posting account environment status', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.postStatus({"account_id": "01000001", "environment_id": "38187AC7-FD71-4292-A8C0-2A52AF863638", "year_month_day": "20151010", "type": "paused", "reason": "some reason"});
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting deployment count', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getDeploymentCount('1234');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting deployment usage history', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getDeploymentUsageHistory('1234', '2019', '05', '13');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting host usage detail', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getDailyHostUsage('1234', '0987', 'myhost', '2019', '05', '13');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting daily usage summary', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getDailyUsageSummary('1234', '2019', '05', '13');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting max hosts daily usage summary', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getMaxHostDailyUsageSummary('1234', '2019', '05', '13');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting max hosts daily usage detail', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getMaxHostDailyUsageDetail('1234', '0987', '2019', '05', '13');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting max hosts hourly usage detail', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getMaxHostHourlyUsageSummary('1234', '2019', '05', '13', '12');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting monthly deployments usage history', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getMonthlyDeploymentsUsageHistory('1234', '2019', '05');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting monthly deployments usage detail', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getMonthlyDeploymentsUsageDetail('1234', '0987', '2019', '05');
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting monthly deployments usage summary', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(UsageClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      await UsageClient.getMonthlyDeploymentsUsageSummary('1234', '0987', '2019', '05');
      expect(stub.callCount).to.equal(1);
    });
  });
    
});
