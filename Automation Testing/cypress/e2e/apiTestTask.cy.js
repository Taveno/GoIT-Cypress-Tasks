describe('Tema 4 - httpbin.org API Otomasyon Testleri', () => {
  //const baseUrl = 'https://httpbin.org';
  // https://httpbin.org yerine geçici olarak bunu dene:
  const baseUrl = 'https://postman-echo.com';

  // 1. GET İsteği ve Status Code Kontrolü
  it('Test 1: GET isteği başarılı bir şekilde 200 OK dönmeli', () => {
    cy.request('GET', `${baseUrl}/get`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.url).to.include('/get');
    });
  });

  // 2. POST İsteği ve Body İçerik Doğrulaması
  it('Test 2: POST isteği gönderilen payload verisini yanıt içinde doğru döndürmeli', () => {
    const payload = { name: 'QA Engineer', role: 'Automation' };

    cy.request('POST', `${baseUrl}/post`, payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.equal(payload);
    });
  });

  // 3. PUT ve PATCH Metotlarının Kontrolü
  it('Test 3: PUT ve PATCH metotları doğru HTTP statü kodu ile yanıt vermeli', () => {
    cy.request('PUT', `${baseUrl}/put`, { update: true }).then((resPut) => {
      expect(resPut.status).to.eq(200);
      expect(resPut.body.json).to.have.property('update', true);
    });

    cy.request('PATCH', `${baseUrl}/patch`, { patch: true }).then((resPatch) => {
      expect(resPatch.status).to.eq(200);
    });
  });

  // 4. DELETE Metodu Kontrolü
  it('Test 4: DELETE isteği başarılı şekilde işlenmeli', () => {
    cy.request('DELETE', `${baseUrl}/delete`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.url).to.include('/delete');
    });
  });

  // 5. Standart Header (User-Agent) Gönderimi ve Kontrolü (Postman-Echo Fix)
  it('Test 5: Standart User-Agent başlığı gönderilmeli ve sunucu tarafından doğrulanmalı', () => {
    const customUserAgent = 'CypressAutomationAgent/1.0';

    cy.request({
      method: 'GET',
      url: `${baseUrl}/headers`,
      headers: {
        'User-Agent': customUserAgent
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      // postman-echo tum header isimlerini kucuk harfe cevirir:
      expect(response.body.headers).to.have.property('user-agent', customUserAgent);
    });
  });

  // 6. Özelleştirilmiş (Custom) Header Gönderimi ve Kontrolü
  it('Test 6: Özelleştirilmiş başlıklar (Custom Headers) isteğe eklenmeli ve doğrulanmalı', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/headers`,
      headers: {
        'X-Special-Header': 'QA-Test-Automation',
        'X-Client-Id': '123456'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers).to.have.property('x-special-header', 'QA-Test-Automation');
      expect(response.body.headers).to.have.property('x-client-id', '123456');
    });
  });

  // 7. Sabit Sorgu Parametreleri (Query Parameters)
  it('Test 7: URL query parametreleri doğru şekilde gönderilmeli', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/get`,
      qs: {
        page: 1,
        limit: 10,
        sort: 'asc'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args).to.deep.equal({
        page: '1',
        limit: '10',
        sort: 'asc'
      });
    });
  });

  // 8. Rastgele Dinamik Sorgu Parametreleri (Random Query Params)
  it('Test 8: Rastgele oluşturulmuş sorgu parametreleri başarıyla gönderilmeli', () => {
    const randomId = Math.floor(Math.random() * 10000);
    const randomToken = Math.random().toString(36).substring(7);

    cy.request({
      method: 'GET',
      url: `${baseUrl}/get`,
      qs: {
        requestId: randomId,
        token: randomToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args.requestId).to.eq(randomId.toString());
      expect(response.body.args.token).to.eq(randomToken);
    });
  });

  // 9. Cevap İçeriği & Schema Doğrulaması (Postman-Echo Fix)
  it('Test 9: Yanıt gövdesindeki veri tipleri ve veri yapısı kontrol edilmeli', () => {
    cy.request('GET', `${baseUrl}/get`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('headers').that.is.an('object');
      expect(response.body).to.have.property('url').that.is.a('string');
      expect(response.body).to.have.property('args').that.is.an('object');
    });
  });

  // 10. Yanıt Süresi (Response Time / Performance) Kontrolü
  it('Test 10: İstek yanıt süresi belirli bir eşik değerin (örn. 2000ms) altında olmalı', () => {
    cy.request('GET', `${baseUrl}/delay/1`).then((response) => {
      expect(response.status).to.eq(200);
      // Yanıt süresinin 3000ms (3 saniye) altında olduğunu kontrol eder
      expect(response.duration).to.be.lessThan(3000);
    });
  });
});