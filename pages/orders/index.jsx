import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import OrderList from '../../modules/orders/components/OrderList';
import useOrderList from '../../modules/orders/hooks/useUserOrderList';
import useRedirect from '../../modules/auth/hooks/useRedirect';

const orders = [
  {
    _id: 'eb97324e-333f-4839-8e29-d7fffe807b0a',
    user: {
      username: 'ntrulock0',
      avatar: {
        url: 'https://robohash.org/cupiditatelaudantiumexercitationem.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: 'a9cc858d-28cf-4c99-8b5a-3963fc553f9b',
        qantity: 4,
        product: {
          _id: '86d48884-8be3-4372-aa36-6c9c2a420692',
          texts: {
            title: 'Calypso - Pineapple Passion',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/174x100.png/dddddd/000000',
            },
          },
        },
      },
      {
        _id: '150769df-ed28-4589-9d52-756909623665',
        qantity: 4,
        product: {
          _id: 'bb6d51bd-eddc-4ec3-b226-7939abe2bf67',
          texts: {
            title: 'Blueberries',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/220x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      {
        _id: '5d588e40-ae17-495c-a1b5-cb2b68712695',
        qantity: 1,
        product: {
          _id: '66647121-4c01-486f-afb9-b6b36f42c709',
          texts: {
            title: 'Sauce - Rosee',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/221x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
    ],
    created: 1632247354000,
    ordered: 1639395262000,
    status: 'PENDING',
    isExpired: false,
    orderNumber: '0926754084',
    fullfilled: 1646487500000,
    rejected: 1642782393000,
    updated: 1645775800000,
    country: {
      _id: '9a68ae3a-54b1-45c7-b65a-5d22c8a5abc8',
      isoCode: 'PH',
      flagEmoji: 'Philippines',
    },
    currency: {
      isoCode: 'PHP',
      isActive: false,
      _id: '8a5c5447-40fd-451d-9342-f9d2774e4ccf',
    },
    logs: [
      {
        _id: '3ff40be6-80f6-4e37-96f9-7c1d3dbe1111',
        created: 1642281408000,
        level: 'ALUMINUM CHLOROHYDRATE',
        message: 'Sed ante. Vivamus tortor.',
        user: {
          _id: '1342ead1-916b-4a56-99c5-eea459a0df86',
          username: 'veastham0',
        },
        order: {
          _id: '21551fb1-565b-461e-b8ac-e1a3a1d9ce53',
          orderNumber: '4140769610',
        },
      },
      {
        _id: '203ada6a-e45a-4d9c-b1f3-663f32ffa935',
        created: 1631789109000,
        level: 'Oxycodone and Acetaminophen',
        message:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.',
        user: {
          _id: 'd4b99a4b-8507-4ac7-b161-8be667047a54',
          username: 'hbaake1',
        },
        order: {
          _id: 'efc3d789-552d-4039-adc4-b2cc8feb4ed6',
          orderNumber: '8953613256',
        },
      },
      {
        _id: '3a606058-a02b-41de-84dd-1466d9607548',
        created: 1629153327000,
        level: 'ALCOHOL',
        message:
          'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        user: {
          _id: 'a1b059fc-ef7c-444e-a3e8-5561a01f6dbd',
          username: 'gjerger2',
        },
        order: {
          _id: 'a3fb9ea4-65fa-48ea-a6e1-48abe80f1433',
          orderNumber: '2691540863',
        },
      },
    ],
    configuration: {
      value: 'Bednar-Hauck',
      compony: 'Devpulse',
      domain: 'utexas.edu',
      TLD: 'net',
    },
    documents: [
      {
        _id: 'd3dc18a7-b872-4379-9781-5ba2db6c0808',
        name: 'Starfish, crown of thorns',
        type: 'application/mspowerpoint',
        url: 'http://engadget.com/sapien.html?ut=quis&mauris=orci&eget=nullam&massa=molestie&tempor=nibh&convallis=in&nulla=lectus&neque=pellentesque&libero=at&convallis=nulla&eget=suspendisse&eleifend=potenti&luctus=cras&ultricies=in&eu=purus&nibh=eu&quisque=magna&id=vulputate&justo=luctus&sit=cum&amet=sociis&sapien=natoque&dignissim=penatibus&vestibulum=et&vestibulum=magnis&ante=dis&ipsum=parturient&primis=montes&in=nascetur&faucibus=ridiculus&orci=mus&luctus=vivamus&et=vestibulum&ultrices=sagittis&posuere=sapien&cubilia=cum&curae=sociis&nulla=natoque&dapibus=penatibus&dolor=et&vel=magnis&est=dis&donec=parturient&odio=montes&justo=nascetur&sollicitudin=ridiculus&ut=mus&suscipit=etiam&a=vel&feugiat=augue&et=vestibulum&eros=rutrum&vestibulum=rutrum&ac=neque&est=aenean&lacinia=auctor&nisi=gravida&venenatis=sem&tristique=praesent&fusce=id&congue=massa&diam=id&id=nisl&ornare=venenatis&imperdiet=lacinia&sapien=aenean&urna=sit&pretium=amet&nisl=justo&ut=morbi&volutpat=ut&sapien=odio&arcu=cras&sed=mi&augue=pede&aliquam=malesuada&erat=in&volutpat=imperdiet&in=et&congue=commodo&etiam=vulputate&justo=justo&etiam=in',
      },
      {
        _id: '03d601d0-505c-4ce0-84b6-434ebdce421e',
        name: 'Phascogale, brush-tailed',
        type: 'application/msword',
        url: 'http://soup.io/condimentum.jpg?eget=platea&nunc=dictumst&donec=aliquam&quis=augue&orci=quam&eget=sollicitudin&orci=vitae&vehicula=consectetuer&condimentum=eget&curabitur=rutrum&in=at&libero=lorem&ut=integer&massa=tincidunt&volutpat=ante&convallis=vel&morbi=ipsum&odio=praesent&odio=blandit&elementum=lacinia&eu=erat&interdum=vestibulum&eu=sed&tincidunt=magna&in=at&leo=nunc&maecenas=commodo&pulvinar=placerat',
      },
      {
        _id: '6412d487-93f9-4beb-a27f-6e3eeca6e5e2',
        name: 'Fox, north american red',
        type: 'video/mpeg',
        url: 'https://livejournal.com/vestibulum/vestibulum/ante.jsp?magna=pede&vestibulum=ac&aliquet=diam&ultrices=cras&erat=pellentesque&tortor=volutpat&sollicitudin=dui&mi=maecenas&sit=tristique&amet=est&lobortis=et&sapien=tempus&sapien=semper&non=est&mi=quam&integer=pharetra&ac=magna&neque=ac&duis=consequat&bibendum=metus&morbi=sapien&non=ut&quam=nunc&nec=vestibulum&dui=ante&luctus=ipsum&rutrum=primis&nulla=in&tellus=faucibus&in=orci&sagittis=luctus&dui=et&vel=ultrices&nisl=posuere&duis=cubilia&ac=curae&nibh=mauris&fusce=viverra&lacus=diam&purus=vitae&aliquet=quam&at=suspendisse&feugiat=potenti&non=nullam&pretium=porttitor&quis=lacus&lectus=at&suspendisse=turpis&potenti=donec&in=posuere&eleifend=metus&quam=vitae&a=ipsum&odio=aliquam&in=non&hac=mauris&habitasse=morbi&platea=non&dictumst=lectus&maecenas=aliquam&ut=sit&massa=amet&quis=diam&augue=in&luctus=magna&tincidunt=bibendum&nulla=imperdiet&mollis=nullam&molestie=orci&lorem=pede&quisque=venenatis&ut=non&erat=sodales&curabitur=sed&gravida=tincidunt&nisi=eu&at=felis&nibh=fusce&in=posuere&hac=felis&habitasse=sed&platea=lacus&dictumst=morbi&aliquam=sem&augue=mauris&quam=laoreet&sollicitudin=ut&vitae=rhoncus',
      },
      {
        _id: '31200bf1-5a9f-45a9-afc0-5aa4b9d8796b',
        name: 'Cheetah',
        type: 'image/tiff',
        url: 'http://issuu.com/eu/interdum/eu/tincidunt/in.js?morbi=tincidunt&porttitor=in&lorem=leo&id=maecenas&ligula=pulvinar&suspendisse=lobortis&ornare=est&consequat=phasellus&lectus=sit&in=amet&est=erat&risus=nulla&auctor=tempus&sed=vivamus&tristique=in&in=felis&tempus=eu&sit=sapien&amet=cursus&sem=vestibulum&fusce=proin&consequat=eu&nulla=mi&nisl=nulla&nunc=ac&nisl=enim&duis=in&bibendum=tempor&felis=turpis&sed=nec&interdum=euismod&venenatis=scelerisque&turpis=quam&enim=turpis&blandit=adipiscing&mi=lorem&in=vitae&porttitor=mattis&pede=nibh&justo=ligula&eu=nec&massa=sem&donec=duis&dapibus=aliquam&duis=convallis&at=nunc&velit=proin&eu=at&est=turpis&congue=a&elementum=pede&in=posuere&hac=nonummy&habitasse=integer&platea=non&dictumst=velit&morbi=donec&vestibulum=diam&velit=neque&id=vestibulum&pretium=eget&iaculis=vulputate&diam=ut&erat=ultrices&fermentum=vel&justo=augue&nec=vestibulum&condimentum=ante&neque=ipsum&sapien=primis&placerat=in&ante=faucibus&nulla=orci&justo=luctus&aliquam=et&quis=ultrices&turpis=posuere&eget=cubilia&elit=curae&sodales=donec&scelerisque=pharetra&mauris=magna&sit=vestibulum&amet=aliquet&eros=ultrices&suspendisse=erat&accumsan=tortor&tortor=sollicitudin',
      },
    ],
  },
  {
    _id: '63e840eb-9749-499a-ba6d-047ad11ae72c',
    user: {
      username: 'tchettoe1',
      avatar: {
        url: 'https://robohash.org/accusamushicratione.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: '248ba2c5-7d23-430f-bfbe-766d2b550396',
        qantity: 5,
        product: {
          _id: '54a87141-751a-4d33-90db-44e0f2c7244c',
          texts: {
            title: 'Sour Cream',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/131x100.png/dddddd/000000',
            },
          },
        },
      },
      {
        _id: 'b216e1e1-3fd4-498c-851b-3cecc000fb6b',
        qantity: 3,
        product: {
          _id: '4c79edb2-3a7b-449d-a20d-4194aebf6921',
          texts: {
            title: 'Spice - Peppercorn Melange',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/189x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      {
        _id: '3d04f266-4660-45aa-9c6e-9c1d4e8fff63',
        qantity: 1,
        product: {
          _id: '0f520262-b9b2-47b3-825b-fb70c5bb9e20',
          texts: {
            title: 'Kirsch - Schloss',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/176x100.png/dddddd/000000',
            },
          },
        },
      },
    ],
    created: 1632876818000,
    ordered: 1644631665000,
    status: 'PENDING',
    isExpired: true,
    orderNumber: '7166779055',
    fullfilled: 1633658901000,
    rejected: 1638979393000,
    updated: 1630102151000,
    country: {
      _id: 'fe82dcc4-69bb-4472-a8cf-145913b543cc',
      isoCode: 'PH',
      flagEmoji: 'Philippines',
    },
    currency: {
      isoCode: 'PHP',
      isActive: true,
      _id: '844a77ae-6325-485a-a974-becb3e3cb0c7',
    },
    logs: [
      {
        _id: '390272f6-2caa-4459-b7cf-5845cc06fed3',
        created: 1639303992000,
        level: 'ALUMINUM CHLOROHYDRATE',
        message: 'Aenean auctor gravida sem.',
        user: {
          _id: 'd3a1cd56-7570-463b-9bad-5dfc79f83db7',
          username: 'atansill0',
        },
        order: {
          _id: '022a2d09-9f2a-491a-a559-3f02e5f031c5',
          orderNumber: '6617792254',
        },
      },
      {
        _id: '402394d7-f7c9-4bb6-9082-54558193bee5',
        created: 1619216492000,
        level: 'OCTINOXATE, TITANIUM DIOXIDE, OCTISALATE',
        message: 'In congue. Etiam justo.',
        user: {
          _id: '21b1b388-9a0b-494c-bb79-dd37929efe63',
          username: 'fahrenius1',
        },
        order: {
          _id: '00c2e768-ed26-4378-8192-2f422adc060e',
          orderNumber: '2838880705',
        },
      },
      {
        _id: '5823d364-62c1-486b-b5ae-568e80d901c8',
        created: 1641516270000,
        level: 'Meloxicam',
        message: 'Nullam varius.',
        user: {
          _id: '13c6aec4-acc2-45e9-a636-7f32c85f666a',
          username: 'lbarizeret2',
        },
        order: {
          _id: '71ccca70-325b-4332-b585-b67349fea846',
          orderNumber: '0402385276',
        },
      },
      {
        _id: '465dc546-5a13-45d6-ac7c-e1fe1a42c95a',
        created: 1634248200000,
        level: 'Cefuroxime',
        message:
          'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.',
        user: {
          _id: '450747fa-4bff-4f8f-a580-3f0a0b3aa26b',
          username: 'jandrusov3',
        },
        order: {
          _id: 'ea7c8d92-7cb0-456c-ae8a-9e6446b05f4a',
          orderNumber: '5142940431',
        },
      },
    ],
    configuration: {
      value: 'Cummerata-Greenholt',
      compony: 'Katz',
      domain: 'guardian.co.uk',
      TLD: 'biz',
    },
    documents: [
      {
        _id: '1ff5bb58-955e-42c9-8602-6608d528061f',
        name: 'Tropical buckeye butterfly',
        type: 'image/gif',
        url: 'http://networksolutions.com/viverra/pede/ac.jpg?amet=dolor&eleifend=sit&pede=amet&libero=consectetuer&quis=adipiscing&orci=elit&nullam=proin&molestie=interdum&nibh=mauris&in=non&lectus=ligula&pellentesque=pellentesque&at=ultrices&nulla=phasellus&suspendisse=id&potenti=sapien&cras=in&in=sapien&purus=iaculis&eu=congue&magna=vivamus&vulputate=metus&luctus=arcu&cum=adipiscing&sociis=molestie&natoque=hendrerit&penatibus=at&et=vulputate&magnis=vitae&dis=nisl&parturient=aenean&montes=lectus&nascetur=pellentesque&ridiculus=eget&mus=nunc&vivamus=donec',
      },
      {
        _id: '3c8f6cf1-c9a2-41a5-bbde-83f242942ca4',
        name: 'Australian masked owl',
        type: 'video/avi',
        url: 'http://weibo.com/aliquam/augue/quam.xml?vestibulum=nulla&rutrum=dapibus&rutrum=dolor&neque=vel&aenean=est&auctor=donec&gravida=odio&sem=justo&praesent=sollicitudin&id=ut&massa=suscipit&id=a&nisl=feugiat&venenatis=et&lacinia=eros&aenean=vestibulum',
      },
      {
        _id: 'c70cb421-14e5-49f3-ba6f-d53605527631',
        name: 'Lorikeet, scaly-breasted',
        type: 'video/mpeg',
        url: 'http://slideshare.net/natoque/penatibus/et/magnis.html?donec=curabitur&odio=convallis&justo=duis&sollicitudin=consequat&ut=dui&suscipit=nec&a=nisi&feugiat=volutpat&et=eleifend&eros=donec',
      },
    ],
  },
  {
    _id: 'b064e94e-7172-4521-b28c-fb404bce567a',
    user: {
      username: 'hsaggers2',
      avatar: {
        url: 'https://robohash.org/veldeseruntomnis.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: '6d4e28b4-2245-40fa-9eb4-b35635443153',
        qantity: 1,
        product: {
          _id: '19bb110d-3a18-4b7e-8e36-eb4cf3a5471b',
          texts: {
            title: 'Dasheen',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/250x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      {
        _id: '023f51ad-3746-48e1-9342-014154be1288',
        qantity: 5,
        product: {
          _id: '959a878e-c479-4890-bc11-dda730a8a4db',
          texts: {
            title: 'Pork - Liver',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/243x100.png/dddddd/000000',
            },
          },
        },
      },
    ],
    created: 1643771131000,
    ordered: 1642455721000,
    status: 'OPEN',
    isExpired: false,
    orderNumber: '9341883148',
    fullfilled: 1645993315000,
    rejected: 1616195076000,
    updated: 1631780856000,
    country: {
      _id: 'ebd57eb4-99e5-4c3a-aba1-7608f3a4a5ab',
      isoCode: 'PE',
      flagEmoji: 'Peru',
    },
    currency: {
      isoCode: 'PEN',
      isActive: true,
      _id: 'a651b3ea-e107-49a3-af6e-37a07c146f5d',
    },
    logs: [
      {
        _id: 'd5442fc0-b787-4cf6-a5c2-9b92cc521748',
        created: 1618872494000,
        level: 'TITANIUM DIOXIDE',
        message: 'Quisque porta volutpat erat.',
        user: {
          _id: 'bcb12171-e63f-4827-b026-422a177c18c8',
          username: 'mzanetto0',
        },
        order: {
          _id: 'd01f52f6-5423-4d4a-864e-598efaef8e83',
          orderNumber: '4710494517',
        },
      },
      {
        _id: '930f8a94-973e-44fd-839d-30e3cacee238',
        created: 1640127043000,
        level: 'Naproxen',
        message: 'Phasellus in felis. Donec semper sapien a libero.',
        user: {
          _id: '0abcd962-3d8a-42d1-82e3-300b31377880',
          username: 'sfernehough1',
        },
        order: {
          _id: '12f5a32d-e8ee-4a4e-a267-363ade1f22f9',
          orderNumber: '0085230227',
        },
      },
      {
        _id: '58cd1cd2-a9a7-4198-9cb2-cc3560c688db',
        created: 1623422432000,
        level: 'Atenolol',
        message: 'Mauris sit amet eros.',
        user: {
          _id: '8159f179-f727-4516-8280-061058b2f998',
          username: 'dlake2',
        },
        order: {
          _id: 'a6ad0f75-d3d0-4913-b8ab-e6427ea5f459',
          orderNumber: '1267050314',
        },
      },
      {
        _id: '7c826b6c-cf98-4691-9ddf-73b3964b3f8a',
        created: 1645949415000,
        level: 'Urea',
        message:
          'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',
        user: {
          _id: '73bd2f29-43fb-4cb6-acd5-d2157145cfbe',
          username: 'vouslem3',
        },
        order: {
          _id: '3e67fc29-e1d4-4a9d-ad58-c747dfd194f6',
          orderNumber: '1364799057',
        },
      },
      {
        _id: '7ba2127f-2401-48de-94c7-f0d822e1d2c2',
        created: 1615901911000,
        level: 'Naproxen',
        message: 'Etiam vel augue. Vestibulum rutrum rutrum neque.',
        user: {
          _id: 'b6dd28f0-ce11-415e-98b8-6e77350ae9c4',
          username: 'clemonby4',
        },
        order: {
          _id: 'f0629799-6c73-48bd-bd91-c7e5a02eb156',
          orderNumber: '3652336623',
        },
      },
    ],
    configuration: {
      value: 'Padberg-Wolff',
      compony: 'Dablist',
      domain: 'google.com',
      TLD: 'edu',
    },
    documents: [
      {
        _id: 'e17332bd-9ff9-47dd-9087-00d0f686a13e',
        name: 'Siskin, pine',
        type: 'video/x-msvideo',
        url: 'http://theglobeandmail.com/venenatis/non/sodales/sed.xml?morbi=maecenas&quis=rhoncus&tortor=aliquam&id=lacus&nulla=morbi&ultrices=quis&aliquet=tortor&maecenas=id&leo=nulla&odio=ultrices&condimentum=aliquet&id=maecenas&luctus=leo&nec=odio&molestie=condimentum&sed=id&justo=luctus&pellentesque=nec&viverra=molestie&pede=sed&ac=justo&diam=pellentesque',
      },
      {
        _id: 'a183702a-16e4-4ab6-bdb0-e7f151fcd5be',
        name: 'Sheathbill, snowy',
        type: 'application/x-msexcel',
        url: 'http://networkadvertising.org/est/congue/elementum.json?cubilia=sociis&curae=natoque&duis=penatibus&faucibus=et&accumsan=magnis&odio=dis&curabitur=parturient&convallis=montes&duis=nascetur&consequat=ridiculus&dui=mus&nec=vivamus&nisi=vestibulum&volutpat=sagittis&eleifend=sapien&donec=cum&ut=sociis&dolor=natoque&morbi=penatibus&vel=et&lectus=magnis&in=dis&quam=parturient&fringilla=montes&rhoncus=nascetur&mauris=ridiculus&enim=mus&leo=etiam&rhoncus=vel&sed=augue&vestibulum=vestibulum&sit=rutrum&amet=rutrum&cursus=neque&id=aenean&turpis=auctor',
      },
      {
        _id: '3a89149d-be08-4c4b-93e5-d98255e2d713',
        name: 'Plains zebra',
        type: 'image/gif',
        url: 'http://narod.ru/rutrum/nulla/tellus/in/sagittis.xml?suspendisse=ultrices&potenti=vel&cras=augue',
      },
      {
        _id: '24c5bb20-0160-40b4-b52a-84eb465a51c5',
        name: 'Otter, cape clawless',
        type: 'application/vnd.ms-powerpoint',
        url: 'https://ted.com/morbi.aspx?morbi=ipsum&vel=praesent&lectus=blandit&in=lacinia&quam=erat&fringilla=vestibulum&rhoncus=sed&mauris=magna&enim=at&leo=nunc&rhoncus=commodo&sed=placerat&vestibulum=praesent&sit=blandit&amet=nam&cursus=nulla&id=integer&turpis=pede&integer=justo&aliquet=lacinia&massa=eget&id=tincidunt&lobortis=eget&convallis=tempus&tortor=vel&risus=pede&dapibus=morbi&augue=porttitor&vel=lorem&accumsan=id',
      },
      {
        _id: 'd0b56316-f91c-4f05-9fef-eef9fa1ada52',
        name: 'Crane, black-crowned',
        type: 'application/vnd.ms-excel',
        url: 'http://privacy.gov.au/accumsan.png?mi=eu',
      },
    ],
  },
  {
    _id: 'c610f7fc-df8c-4b46-9f0a-25bd13736806',
    user: {
      username: 'mmatz3',
      avatar: {
        url: 'https://robohash.org/etblanditiisbeatae.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: 'b5df017b-37ca-4d3d-bd24-daa264c5408d',
        qantity: 1,
        product: {
          _id: '01a8c012-e273-4685-b92b-5c5ddb1e3e74',
          texts: {
            title: 'Squash - Guords',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/247x100.png/dddddd/000000',
            },
          },
        },
      },
    ],
    created: 1632762904000,
    ordered: 1633145855000,
    status: 'CONFIRMED',
    isExpired: false,
    orderNumber: '1541290267',
    fullfilled: 1631753254000,
    rejected: 1645810065000,
    updated: 1632114944000,
    country: {
      _id: '498f1926-b55a-4101-88c5-e711a2320bb7',
      isoCode: 'EG',
      flagEmoji: 'Egypt',
    },
    currency: {
      isoCode: 'EGP',
      isActive: true,
      _id: '409eba89-6209-48e9-95bf-911abd22c6db',
    },
    logs: [
      {
        _id: '1cc253e0-390c-4744-abf3-3fbbec7b4386',
        created: 1644729242000,
        level: 'verapamil hydrochloride',
        message: 'Curabitur at ipsum ac tellus semper interdum.',
        user: {
          _id: '5c18dcb3-ecc6-44dd-be39-6d970be2f15d',
          username: 'dbonnette0',
        },
        order: {
          _id: '547eddfb-b983-420c-817c-d76316d74a59',
          orderNumber: '9859242208',
        },
      },
      {
        _id: '67af57e5-04aa-4547-a5f9-ac32f97b2d7c',
        created: 1635466574000,
        level: 'Octinoxate and Oxybenzone',
        message:
          'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        user: {
          _id: 'ca6a71e8-9957-472e-929e-499229dc9123',
          username: 'fpavy1',
        },
        order: {
          _id: '2ac92a39-5fc4-4b9b-a3c2-f73e1ecde64a',
          orderNumber: '6869984514',
        },
      },
      {
        _id: '461ee481-f52f-4a43-88e6-3f8259fca815',
        created: 1637179588000,
        level: 'Triclosan',
        message:
          'Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
        user: {
          _id: '153dd946-5df8-42cf-81d6-4b6f11dc5edb',
          username: 'gmaccumeskey2',
        },
        order: {
          _id: '389eca1a-cb93-48ef-97b8-19666be62a50',
          orderNumber: '0412963876',
        },
      },
      {
        _id: '1c1b0e70-c1c7-4179-a38e-abea9dc9f12e',
        created: 1620637586000,
        level: 'Nitrofurantoin Macrocrystals',
        message: 'Sed sagittis.',
        user: {
          _id: '9c2b246d-e1eb-401b-8650-de92aee1a3a3',
          username: 'olaviste3',
        },
        order: {
          _id: '4d7177d5-03be-4cc9-8eb6-b124918b92fe',
          orderNumber: '5154515609',
        },
      },
    ],
    configuration: {
      value: 'Shanahan, Willms and Hahn',
      compony: 'Livetube',
      domain: 'spotify.com',
      TLD: 'com',
    },
    documents: [
      {
        _id: '1c52384f-facb-44cb-9d58-5eccdaf3ee56',
        name: 'Gazer, sun',
        type: 'application/msword',
        url: 'https://seesaa.net/risus/dapibus/augue/vel/accumsan/tellus.html?sem=at&duis=nulla&aliquam=suspendisse&convallis=potenti&nunc=cras&proin=in&at=purus&turpis=eu&a=magna&pede=vulputate&posuere=luctus&nonummy=cum&integer=sociis&non=natoque&velit=penatibus&donec=et&diam=magnis&neque=dis&vestibulum=parturient&eget=montes&vulputate=nascetur&ut=ridiculus&ultrices=mus&vel=vivamus&augue=vestibulum&vestibulum=sagittis&ante=sapien&ipsum=cum&primis=sociis&in=natoque&faucibus=penatibus&orci=et&luctus=magnis&et=dis&ultrices=parturient&posuere=montes&cubilia=nascetur&curae=ridiculus&donec=mus&pharetra=etiam',
      },
      {
        _id: '5341b8a2-73a4-4ed6-a1e5-63a558a1ad8c',
        name: "Pallas's fish eagle",
        type: 'application/msword',
        url: 'https://ebay.co.uk/tincidunt/lacus/at/velit/vivamus/vel.png?risus=donec',
      },
      {
        _id: 'e7a92b2e-da1e-43c1-8bc3-2c58de76b96d',
        name: 'Cockatoo, red-breasted',
        type: 'audio/x-mpeg-3',
        url: 'https://vinaora.com/nullam/orci/pede/venenatis/non/sodales.jpg?lectus=aliquet&pellentesque=at&at=feugiat&nulla=non&suspendisse=pretium&potenti=quis&cras=lectus&in=suspendisse&purus=potenti&eu=in&magna=eleifend&vulputate=quam&luctus=a&cum=odio&sociis=in&natoque=hac&penatibus=habitasse&et=platea&magnis=dictumst&dis=maecenas&parturient=ut&montes=massa&nascetur=quis&ridiculus=augue&mus=luctus&vivamus=tincidunt&vestibulum=nulla&sagittis=mollis&sapien=molestie&cum=lorem&sociis=quisque&natoque=ut&penatibus=erat&et=curabitur&magnis=gravida&dis=nisi&parturient=at&montes=nibh&nascetur=in&ridiculus=hac&mus=habitasse&etiam=platea&vel=dictumst&augue=aliquam&vestibulum=augue&rutrum=quam&rutrum=sollicitudin&neque=vitae&aenean=consectetuer&auctor=eget&gravida=rutrum&sem=at&praesent=lorem&id=integer&massa=tincidunt&id=ante&nisl=vel&venenatis=ipsum&lacinia=praesent&aenean=blandit&sit=lacinia&amet=erat&justo=vestibulum&morbi=sed&ut=magna&odio=at&cras=nunc&mi=commodo&pede=placerat',
      },
      {
        _id: 'd0d40433-1068-4f37-8de2-e8593f30bf35',
        name: 'Eastern boa constrictor',
        type: 'application/x-excel',
        url: 'http://harvard.edu/ac/lobortis/vel/dapibus/at.jpg?vestibulum=ipsum&ante=primis&ipsum=in&primis=faucibus&in=orci&faucibus=luctus&orci=et&luctus=ultrices&et=posuere&ultrices=cubilia&posuere=curae&cubilia=nulla&curae=dapibus&donec=dolor&pharetra=vel&magna=est&vestibulum=donec&aliquet=odio&ultrices=justo&erat=sollicitudin&tortor=ut&sollicitudin=suscipit&mi=a&sit=feugiat&amet=et&lobortis=eros&sapien=vestibulum&sapien=ac&non=est&mi=lacinia&integer=nisi&ac=venenatis&neque=tristique&duis=fusce&bibendum=congue&morbi=diam&non=id&quam=ornare&nec=imperdiet&dui=sapien&luctus=urna&rutrum=pretium&nulla=nisl&tellus=ut&in=volutpat&sagittis=sapien&dui=arcu&vel=sed&nisl=augue&duis=aliquam&ac=erat&nibh=volutpat&fusce=in&lacus=congue&purus=etiam&aliquet=justo&at=etiam&feugiat=pretium&non=iaculis&pretium=justo&quis=in&lectus=hac&suspendisse=habitasse&potenti=platea&in=dictumst&eleifend=etiam&quam=faucibus&a=cursus&odio=urna&in=ut&hac=tellus&habitasse=nulla',
      },
    ],
  },
  {
    _id: '65a8641f-4c67-4a99-8f91-219992e0b8db',
    user: {
      username: 'oloyns4',
      avatar: {
        url: 'https://robohash.org/dignissimosrerumsit.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: 'fab89a82-258b-4f9d-a0e5-6a00655075e7',
        qantity: 1,
        product: {
          _id: 'fec1420e-3ae0-45f9-b2ca-f8532ea40233',
          texts: {
            title: 'Rum - Mount Gay Eclipes',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/218x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      {
        _id: '7d0c471d-767a-472c-9c1c-91bebf8528b2',
        qantity: 1,
        product: {
          _id: '8289bef3-99a3-456b-807b-337374fc6130',
          texts: {
            title: 'Melon - Cantaloupe',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/157x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
    ],
    created: 1621234204000,
    ordered: 1616848479000,
    status: 'FULLFILLED',
    isExpired: true,
    orderNumber: '2809238308',
    fullfilled: 1624024524000,
    rejected: 1639274594000,
    updated: 1643106466000,
    country: {
      _id: '0de5efb4-5c57-4dd1-8dd2-80aed906fc26',
      isoCode: 'TH',
      flagEmoji: 'Thailand',
    },
    currency: {
      isoCode: 'THB',
      isActive: true,
      _id: '078731e7-9b06-40d4-a257-67d5401c6b7e',
    },
    logs: [
      {
        _id: '0446a376-737c-4da7-93ec-49ab870d395f',
        created: 1621408697000,
        level: 'DOCUSATE SODIUM',
        message: 'Phasellus sit amet erat. Nulla tempus.',
        user: {
          _id: 'cc806a84-d45d-4b24-bb7d-69cdc1fc0b85',
          username: 'cbutten0',
        },
        order: {
          _id: 'b808f3ce-b614-4248-93a7-2a98533e5473',
          orderNumber: '1936376415',
        },
      },
      {
        _id: '3fd3e640-b195-4e9e-9dfd-67fee233fe50',
        created: 1630937108000,
        level: 'TRAMADOL HYDROCHLORIDE',
        message: 'Duis mattis egestas metus.',
        user: {
          _id: '859a0353-d3ad-4e02-bec2-f2f9f08e59e8',
          username: 'mchasen1',
        },
        order: {
          _id: '1ea4c609-1ed3-4d1e-8684-4951688592bc',
          orderNumber: '4300455589',
        },
      },
      {
        _id: '0e7a6d00-4fb4-4c61-9a23-c23627aa7e8d',
        created: 1642074074000,
        level: 'Gabapentin',
        message: 'Nullam molestie nibh in lectus.',
        user: {
          _id: 'ebc27703-dd5b-4d72-867b-0369385d5f0d',
          username: 'dcadman2',
        },
        order: {
          _id: 'e5914ae1-48ab-4d71-b1fd-33483aed7ec9',
          orderNumber: '2872921729',
        },
      },
      {
        _id: '1564f3e7-5d58-4e85-911f-ab83bc7e2d16',
        created: 1627489319000,
        level:
          'Agnus castus, Lachesis mutus, Lycopodium clavatum, Natrum muriaticum, Nux vomica, Phosphoricum acidum, Phosphorus, Pulsatilla, Sepia,',
        message: 'In congue.',
        user: {
          _id: '71cb3036-0196-42c4-b9e1-334c3c825e31',
          username: 'equoit3',
        },
        order: {
          _id: 'b3b0f0cb-d79b-4717-b3ec-bfc51f0b395e',
          orderNumber: '9699745541',
        },
      },
      {
        _id: '57004126-fb2f-42dd-b6a6-3a1c303aaa33',
        created: 1640525483000,
        level: 'Dimethicone',
        message:
          'Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.',
        user: {
          _id: '21dd5b67-7485-4e87-8cce-974d04c3a6db',
          username: 'stomaskov4',
        },
        order: {
          _id: '2f7aa852-269d-4ed9-ae65-3edeec49f9ff',
          orderNumber: '1693999889',
        },
      },
    ],
    configuration: {
      value: 'Reinger-Kulas',
      compony: 'Fiveclub',
      domain: 'yandex.ru',
      TLD: 'mil',
    },
    documents: [
      {
        _id: 'e54ca805-55b1-4cec-a2b9-9e54a82dee97',
        name: 'Boa, mexican',
        type: 'application/vnd.ms-excel',
        url: 'http://goodreads.com/odio/consequat/varius/integer/ac/leo/pellentesque.xml?placerat=orci&ante=luctus&nulla=et&justo=ultrices&aliquam=posuere&quis=cubilia&turpis=curae&eget=duis&elit=faucibus&sodales=accumsan&scelerisque=odio&mauris=curabitur&sit=convallis&amet=duis&eros=consequat&suspendisse=dui&accumsan=nec&tortor=nisi&quis=volutpat&turpis=eleifend&sed=donec&ante=ut&vivamus=dolor&tortor=morbi&duis=vel&mattis=lectus&egestas=in&metus=quam&aenean=fringilla&fermentum=rhoncus&donec=mauris&ut=enim&mauris=leo&eget=rhoncus&massa=sed&tempor=vestibulum&convallis=sit&nulla=amet&neque=cursus&libero=id&convallis=turpis&eget=integer&eleifend=aliquet&luctus=massa&ultricies=id&eu=lobortis&nibh=convallis&quisque=tortor&id=risus&justo=dapibus&sit=augue&amet=vel&sapien=accumsan&dignissim=tellus&vestibulum=nisi&vestibulum=eu&ante=orci&ipsum=mauris&primis=lacinia&in=sapien&faucibus=quis&orci=libero&luctus=nullam&et=sit&ultrices=amet&posuere=turpis&cubilia=elementum&curae=ligula&nulla=vehicula&dapibus=consequat&dolor=morbi&vel=a&est=ipsum&donec=integer&odio=a&justo=nibh&sollicitudin=in&ut=quis&suscipit=justo&a=maecenas&feugiat=rhoncus&et=aliquam&eros=lacus&vestibulum=morbi&ac=quis&est=tortor&lacinia=id&nisi=nulla&venenatis=ultrices&tristique=aliquet&fusce=maecenas&congue=leo&diam=odio&id=condimentum&ornare=id&imperdiet=luctus&sapien=nec&urna=molestie&pretium=sed&nisl=justo',
      },
      {
        _id: '3b34f283-d61e-4f70-8c31-189ccbb9a7e8',
        name: 'Possum, golden brush-tailed',
        type: 'video/msvideo',
        url: 'https://earthlink.net/dui/luctus/rutrum/nulla.aspx?at=sodales&velit=sed&eu=tincidunt&est=eu&congue=felis&elementum=fusce&in=posuere&hac=felis&habitasse=sed&platea=lacus&dictumst=morbi&morbi=sem&vestibulum=mauris&velit=laoreet&id=ut&pretium=rhoncus&iaculis=aliquet&diam=pulvinar&erat=sed&fermentum=nisl&justo=nunc&nec=rhoncus&condimentum=dui&neque=vel&sapien=sem&placerat=sed&ante=sagittis&nulla=nam&justo=congue&aliquam=risus&quis=semper&turpis=porta&eget=volutpat&elit=quam&sodales=pede&scelerisque=lobortis&mauris=ligula&sit=sit&amet=amet&eros=eleifend&suspendisse=pede&accumsan=libero',
      },
      {
        _id: '07cb60f4-50a9-47da-aa6e-767cc050d0a6',
        name: 'Griffon vulture',
        type: 'application/x-excel',
        url: 'http://engadget.com/dignissim/vestibulum/vestibulum.png?volutpat=condimentum&dui=id&maecenas=luctus&tristique=nec&est=molestie&et=sed&tempus=justo&semper=pellentesque&est=viverra&quam=pede&pharetra=ac&magna=diam&ac=cras&consequat=pellentesque&metus=volutpat&sapien=dui&ut=maecenas&nunc=tristique&vestibulum=est&ante=et&ipsum=tempus&primis=semper&in=est&faucibus=quam&orci=pharetra&luctus=magna&et=ac&ultrices=consequat&posuere=metus&cubilia=sapien&curae=ut&mauris=nunc&viverra=vestibulum&diam=ante&vitae=ipsum&quam=primis&suspendisse=in&potenti=faucibus&nullam=orci&porttitor=luctus&lacus=et&at=ultrices&turpis=posuere',
      },
    ],
  },
  {
    _id: '3dce5756-6451-477c-8848-0425fee8d15e',
    user: {
      username: 'rblancowe5',
      avatar: {
        url: 'https://robohash.org/voluptatemexpeditaharum.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: 'f5d8eadc-32ff-4598-8189-ceecb76370ca',
        qantity: 2,
        product: {
          _id: '88287bbe-015a-4ab2-bdd3-75eeeee13bd5',
          texts: {
            title: 'Paper Towel Touchless',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/140x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      {
        _id: '8f043958-9e28-4fc1-9d6e-f7a5b894c725',
        qantity: 1,
        product: {
          _id: '58f88dad-fb31-4ce3-8a78-033f91fe5d95',
          texts: {
            title: 'Wine - Delicato Merlot',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/176x100.png/ff4444/ffffff',
            },
          },
        },
      },
    ],
    created: 1634775804000,
    ordered: 1626535678000,
    status: 'PENDING',
    isExpired: false,
    orderNumber: '4047593303',
    fullfilled: 1642943484000,
    rejected: 1633262126000,
    updated: 1626840480000,
    country: {
      _id: '0bc0d01f-6ecc-44ee-ae77-d6a0cdef7dde',
      isoCode: 'BA',
      flagEmoji: 'Bosnia and Herzegovina',
    },
    currency: {
      isoCode: 'BAM',
      isActive: false,
      _id: '3233c3b1-fb18-4535-91ce-f03890777eca',
    },
    logs: [
      {
        _id: '3ff1ee71-ff51-492d-aaef-62b5f038228e',
        created: 1617081764000,
        level: 'Ampicillin Trihydrate',
        message: 'In quis justo. Maecenas rhoncus aliquam lacus.',
        user: {
          _id: '24c01adb-f072-4661-b2e7-95e4485bb40a',
          username: 'bdoull0',
        },
        order: {
          _id: 'e762af0a-5929-47fb-af92-9b5d04cc8ef8',
          orderNumber: '7269436290',
        },
      },
      {
        _id: '9ccbc771-6e74-4694-be0b-3d10bb5005cb',
        created: 1645646761000,
        level: 'ALUMINUM SESQUICHLOROHYDRATE',
        message: 'Nullam molestie nibh in lectus. Pellentesque at nulla.',
        user: {
          _id: '55f1b8a7-cdd5-44d8-9238-8950320deff7',
          username: 'mworvell1',
        },
        order: {
          _id: 'ff6522ba-5f70-4473-a802-b5e82cce820c',
          orderNumber: '3469452644',
        },
      },
      {
        _id: 'e296368b-fafd-423c-9d6d-28a91a1eea5f',
        created: 1629216116000,
        level: 'Minoxidil',
        message: 'Aliquam erat volutpat.',
        user: {
          _id: '11595e82-3962-4445-88fb-2d10d4b723bb',
          username: 'nsmidmoor2',
        },
        order: {
          _id: '1163b5c7-36b9-4f35-8b33-8d20ca402218',
          orderNumber: '2521936685',
        },
      },
      {
        _id: '3935055c-3aab-4be0-82d2-1e596c05b4c8',
        created: 1645637018000,
        level: 'Stannous Fluoride',
        message:
          'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.',
        user: {
          _id: '11e90e68-e0dd-48e3-8ad9-8c75a093f9d3',
          username: 'cstemp3',
        },
        order: {
          _id: '1202ccfe-75ef-4b5a-a78e-1b8c68a0c534',
          orderNumber: '9804863251',
        },
      },
    ],
    configuration: {
      value: 'Braun LLC',
      compony: 'Mita',
      domain: 'digg.com',
      TLD: 'org',
    },
    documents: [
      {
        _id: '06f8d63e-94fa-42d1-836f-de0ba87d3a6d',
        name: 'Southern boubou',
        type: 'application/x-excel',
        url: 'http://techcrunch.com/dictumst/aliquam.aspx?ut=convallis&suscipit=nulla&a=neque&feugiat=libero&et=convallis&eros=eget&vestibulum=eleifend&ac=luctus&est=ultricies&lacinia=eu&nisi=nibh&venenatis=quisque&tristique=id&fusce=justo&congue=sit&diam=amet&id=sapien&ornare=dignissim&imperdiet=vestibulum&sapien=vestibulum&urna=ante&pretium=ipsum&nisl=primis&ut=in&volutpat=faucibus&sapien=orci&arcu=luctus&sed=et&augue=ultrices&aliquam=posuere&erat=cubilia&volutpat=curae&in=nulla&congue=dapibus&etiam=dolor&justo=vel&etiam=est&pretium=donec&iaculis=odio&justo=justo&in=sollicitudin&hac=ut&habitasse=suscipit&platea=a&dictumst=feugiat&etiam=et&faucibus=eros&cursus=vestibulum&urna=ac&ut=est&tellus=lacinia&nulla=nisi&ut=venenatis&erat=tristique&id=fusce&mauris=congue&vulputate=diam&elementum=id&nullam=ornare&varius=imperdiet&nulla=sapien&facilisi=urna&cras=pretium&non=nisl&velit=ut&nec=volutpat&nisi=sapien&vulputate=arcu&nonummy=sed&maecenas=augue&tincidunt=aliquam&lacus=erat&at=volutpat&velit=in&vivamus=congue&vel=etiam&nulla=justo',
      },
      {
        _id: '52831bdd-2e65-4607-ae84-5e737a0e4af7',
        name: 'Nubian bee-eater',
        type: 'text/plain',
        url: 'https://howstuffworks.com/erat/nulla/tempus/vivamus/in.jpg?quam=consequat&pede=varius&lobortis=integer&ligula=ac&sit=leo&amet=pellentesque&eleifend=ultrices&pede=mattis&libero=odio&quis=donec&orci=vitae&nullam=nisi&molestie=nam&nibh=ultrices&in=libero&lectus=non&pellentesque=mattis&at=pulvinar&nulla=nulla&suspendisse=pede&potenti=ullamcorper&cras=augue&in=a&purus=suscipit&eu=nulla&magna=elit&vulputate=ac&luctus=nulla&cum=sed&sociis=vel&natoque=enim&penatibus=sit&et=amet&magnis=nunc&dis=viverra&parturient=dapibus&montes=nulla&nascetur=suscipit&ridiculus=ligula&mus=in&vivamus=lacus&vestibulum=curabitur&sagittis=at&sapien=ipsum&cum=ac&sociis=tellus&natoque=semper&penatibus=interdum&et=mauris&magnis=ullamcorper&dis=purus&parturient=sit&montes=amet&nascetur=nulla&ridiculus=quisque&mus=arcu',
      },
      {
        _id: '11587fd9-094f-4cdd-b40e-134224ccc05e',
        name: 'Marmot, yellow-bellied',
        type: 'video/mpeg',
        url: 'https://liveinternet.ru/nulla/mollis/molestie/lorem.png?erat=cum&volutpat=sociis&in=natoque&congue=penatibus&etiam=et&justo=magnis&etiam=dis&pretium=parturient&iaculis=montes&justo=nascetur&in=ridiculus&hac=mus&habitasse=vivamus&platea=vestibulum&dictumst=sagittis&etiam=sapien&faucibus=cum&cursus=sociis&urna=natoque&ut=penatibus&tellus=et&nulla=magnis&ut=dis&erat=parturient&id=montes&mauris=nascetur&vulputate=ridiculus&elementum=mus&nullam=etiam&varius=vel&nulla=augue&facilisi=vestibulum&cras=rutrum&non=rutrum&velit=neque&nec=aenean&nisi=auctor&vulputate=gravida&nonummy=sem&maecenas=praesent&tincidunt=id&lacus=massa&at=id&velit=nisl&vivamus=venenatis&vel=lacinia&nulla=aenean&eget=sit&eros=amet&elementum=justo&pellentesque=morbi&quisque=ut&porta=odio&volutpat=cras&erat=mi&quisque=pede&erat=malesuada&eros=in&viverra=imperdiet&eget=et&congue=commodo&eget=vulputate&semper=justo&rutrum=in&nulla=blandit&nunc=ultrices&purus=enim&phasellus=lorem&in=ipsum&felis=dolor&donec=sit',
      },
    ],
  },
  {
    _id: '1a48560b-fd75-43ee-9f33-69f930eebe1d',
    user: {
      username: 'jseagar6',
      avatar: {
        url: 'https://robohash.org/laborumomnisvoluptatem.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: '27de3d4b-4586-4461-bf1b-77334412a95b',
        qantity: 5,
        product: {
          _id: 'db871f07-0848-464f-b0f5-fda193c5a2a6',
          texts: {
            title: 'Quiche Assorted',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/152x100.png/ff4444/ffffff',
            },
          },
        },
      },
      {
        _id: '70484118-233d-49cb-9021-34998710c06e',
        qantity: 2,
        product: {
          _id: '8f2b9350-f5a1-48b4-8af6-161dfbf74eab',
          texts: {
            title: 'Juice - V8, Tomato',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/244x100.png/dddddd/000000',
            },
          },
        },
      },
      {
        _id: 'e643ac04-d6ed-441f-b50b-e8034484320c',
        qantity: 2,
        product: {
          _id: '062dd8e3-2eb7-418a-81ed-3f1326b1cd9a',
          texts: {
            title: 'Sausage - Chorizo',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/206x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
    ],
    created: 1631289199000,
    ordered: 1640719532000,
    status: 'OPEN',
    isExpired: false,
    orderNumber: '0008166218',
    fullfilled: 1627239570000,
    rejected: 1631158874000,
    updated: 1615504861000,
    country: {
      _id: '74069d11-9819-4b30-95bc-a350959415a7',
      isoCode: 'PE',
      flagEmoji: 'Peru',
    },
    currency: {
      isoCode: 'PEN',
      isActive: false,
      _id: 'a41a6ae1-6ddb-4a83-b684-a743f306d753',
    },
    logs: [
      {
        _id: '844c1921-1cf4-446c-b49a-82dfe227f7f0',
        created: 1616097210000,
        level: 'methotrexate',
        message:
          'Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        user: {
          _id: '3b53d2ef-8e20-4daf-ac2c-d8cfbe9de518',
          username: 'ashegog0',
        },
        order: {
          _id: 'ec8da96f-d740-477f-9047-c061192928c2',
          orderNumber: '4424977757',
        },
      },
      {
        _id: '8af511d7-2a02-4f48-a160-a9d5568ddfa6',
        created: 1625295414000,
        level: 'Nicotine Polacrilex',
        message:
          'Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.',
        user: {
          _id: '46047681-40e8-442d-973b-507acb7040d7',
          username: 'ktroppmann1',
        },
        order: {
          _id: '8e8cf049-9dd7-4e76-a691-b0603e4f916a',
          orderNumber: '3004175851',
        },
      },
      {
        _id: '9f173721-b00b-437d-b45d-83eff2a9a905',
        created: 1631830886000,
        level: 'Clonazepam',
        message:
          'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.',
        user: {
          _id: '953c7e56-ee08-47cd-a0bc-7e03a8cdda34',
          username: 'fwingeat2',
        },
        order: {
          _id: '53cffb31-8932-4fc0-9e7c-1d92539614b8',
          orderNumber: '9603415197',
        },
      },
      {
        _id: '9af92222-3f43-403d-a353-1a145808ea40',
        created: 1624168832000,
        level: 'Propranolol Hydrochloride',
        message:
          'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        user: {
          _id: '77052a65-b1f9-47e8-89f6-d6ab38d23178',
          username: 'tburds3',
        },
        order: {
          _id: '5f2bbc93-7789-4c96-837a-6fefe4c80aca',
          orderNumber: '2866662628',
        },
      },
      {
        _id: 'f8d68bfd-ce62-4f83-9cb0-20cccb69d6b9',
        created: 1636403999000,
        level: 'Titanium Dioxide and Zinc Oxide',
        message:
          'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        user: {
          _id: 'fec9daa6-eb08-4431-b513-911fae71a13b',
          username: 'edesaur4',
        },
        order: {
          _id: '686ed7c0-56a1-4f6a-9a24-b88ea432ef7a',
          orderNumber: '3861582481',
        },
      },
    ],
    configuration: {
      value: 'Buckridge Group',
      compony: 'Skynoodle',
      domain: 'latimes.com',
      TLD: 'mil',
    },
    documents: [
      {
        _id: 'd3d6cab7-d733-4ada-8589-6e70b727dcb1',
        name: 'Red-knobbed coot',
        type: 'audio/x-mpeg-3',
        url: 'https://newyorker.com/at/nibh/in/hac/habitasse/platea.aspx?aliquam=integer&erat=non&volutpat=velit&in=donec&congue=diam&etiam=neque&justo=vestibulum&etiam=eget&pretium=vulputate&iaculis=ut&justo=ultrices&in=vel&hac=augue&habitasse=vestibulum&platea=ante&dictumst=ipsum&etiam=primis&faucibus=in&cursus=faucibus&urna=orci&ut=luctus&tellus=et&nulla=ultrices&ut=posuere&erat=cubilia&id=curae&mauris=donec&vulputate=pharetra&elementum=magna&nullam=vestibulum&varius=aliquet&nulla=ultrices&facilisi=erat&cras=tortor&non=sollicitudin&velit=mi&nec=sit&nisi=amet&vulputate=lobortis&nonummy=sapien&maecenas=sapien&tincidunt=non&lacus=mi&at=integer&velit=ac&vivamus=neque&vel=duis&nulla=bibendum&eget=morbi&eros=non&elementum=quam&pellentesque=nec&quisque=dui&porta=luctus&volutpat=rutrum&erat=nulla&quisque=tellus&erat=in&eros=sagittis&viverra=dui&eget=vel&congue=nisl&eget=duis',
      },
      {
        _id: 'c1271c29-9f4b-4424-a1e0-01a69d81eb52',
        name: 'Bohor reedbuck',
        type: 'image/pjpeg',
        url: 'http://fema.gov/dui/vel/nisl/duis.xml?amet=erat&eros=eros&suspendisse=viverra&accumsan=eget&tortor=congue&quis=eget&turpis=semper&sed=rutrum&ante=nulla&vivamus=nunc&tortor=purus&duis=phasellus&mattis=in&egestas=felis&metus=donec&aenean=semper&fermentum=sapien&donec=a&ut=libero&mauris=nam&eget=dui&massa=proin&tempor=leo&convallis=odio&nulla=porttitor&neque=id&libero=consequat&convallis=in&eget=consequat&eleifend=ut&luctus=nulla&ultricies=sed&eu=accumsan&nibh=felis&quisque=ut&id=at&justo=dolor&sit=quis&amet=odio&sapien=consequat&dignissim=varius&vestibulum=integer',
      },
      {
        _id: 'fdcbc7e6-ab84-4ca3-88a3-2af3532a6322',
        name: 'Dusky gull',
        type: 'image/jpeg',
        url: 'http://csmonitor.com/curabitur/convallis.jpg?id=id&nisl=ligula&venenatis=suspendisse&lacinia=ornare&aenean=consequat&sit=lectus&amet=in&justo=est&morbi=risus&ut=auctor&odio=sed&cras=tristique&mi=in&pede=tempus&malesuada=sit&in=amet&imperdiet=sem&et=fusce&commodo=consequat&vulputate=nulla&justo=nisl&in=nunc&blandit=nisl&ultrices=duis&enim=bibendum&lorem=felis&ipsum=sed&dolor=interdum&sit=venenatis&amet=turpis&consectetuer=enim&adipiscing=blandit&elit=mi&proin=in&interdum=porttitor&mauris=pede&non=justo&ligula=eu&pellentesque=massa&ultrices=donec&phasellus=dapibus&id=duis&sapien=at&in=velit&sapien=eu&iaculis=est&congue=congue&vivamus=elementum&metus=in&arcu=hac&adipiscing=habitasse&molestie=platea&hendrerit=dictumst&at=morbi&vulputate=vestibulum&vitae=velit&nisl=id&aenean=pretium&lectus=iaculis&pellentesque=diam&eget=erat&nunc=fermentum&donec=justo&quis=nec&orci=condimentum&eget=neque&orci=sapien&vehicula=placerat&condimentum=ante',
      },
      {
        _id: '94ae0ab6-887b-4bd6-b764-32658b66bb23',
        name: 'Asian red fox',
        type: 'application/mspowerpoint',
        url: 'http://163.com/ut/mauris/eget/massa/tempor.html?amet=sed&sapien=sagittis&dignissim=nam&vestibulum=congue&vestibulum=risus&ante=semper&ipsum=porta&primis=volutpat&in=quam&faucibus=pede&orci=lobortis&luctus=ligula&et=sit&ultrices=amet&posuere=eleifend&cubilia=pede&curae=libero&nulla=quis&dapibus=orci&dolor=nullam&vel=molestie&est=nibh&donec=in&odio=lectus&justo=pellentesque&sollicitudin=at&ut=nulla&suscipit=suspendisse&a=potenti&feugiat=cras&et=in&eros=purus&vestibulum=eu&ac=magna&est=vulputate&lacinia=luctus&nisi=cum&venenatis=sociis&tristique=natoque&fusce=penatibus&congue=et&diam=magnis&id=dis&ornare=parturient&imperdiet=montes&sapien=nascetur&urna=ridiculus&pretium=mus&nisl=vivamus&ut=vestibulum&volutpat=sagittis&sapien=sapien&arcu=cum&sed=sociis&augue=natoque&aliquam=penatibus&erat=et&volutpat=magnis&in=dis&congue=parturient&etiam=montes&justo=nascetur&etiam=ridiculus&pretium=mus&iaculis=etiam&justo=vel&in=augue&hac=vestibulum&habitasse=rutrum&platea=rutrum&dictumst=neque&etiam=aenean&faucibus=auctor&cursus=gravida&urna=sem&ut=praesent&tellus=id&nulla=massa&ut=id&erat=nisl&id=venenatis&mauris=lacinia&vulputate=aenean',
      },
    ],
  },
  {
    _id: '0c6c4e9a-b9cd-49f7-8ab0-09137d945d33',
    user: {
      username: 'ydallosso7',
      avatar: {
        url: 'https://robohash.org/remutomnis.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: '2219e548-b196-4ee7-b70b-6a49546f1e3c',
        qantity: 2,
        product: {
          _id: '0eb03383-90d4-4268-be16-205044e2c01a',
          texts: {
            title: 'Wasabi Paste',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/167x100.png/ff4444/ffffff',
            },
          },
        },
      },
      {
        _id: '95e85da5-4c92-4ffb-98af-ef180bb3680d',
        qantity: 1,
        product: {
          _id: '409e4ac0-f292-49cf-8397-b334651fb94c',
          texts: {
            title: 'Temperature Recording Station',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/157x100.png/ff4444/ffffff',
            },
          },
        },
      },
      {
        _id: '652490b8-d490-4639-9924-713256942529',
        qantity: 2,
        product: {
          _id: '31c3fb8d-ffcc-420a-a830-0945c43402f4',
          texts: {
            title: 'Plums - Red',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/196x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      {
        _id: 'a0606743-b4d9-4b4b-ae82-3e2de4411dea',
        qantity: 5,
        product: {
          _id: '16a87873-0eaf-414d-a4af-c01bbdd7868d',
          texts: {
            title: 'Wiberg Super Cure',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/198x100.png/dddddd/000000',
            },
          },
        },
      },
      {
        _id: 'c94d6bb4-411c-44b6-af54-3805ea8b2418',
        qantity: 1,
        product: {
          _id: 'bf0ee01a-2424-4aa4-b5aa-16a97c20dbab',
          texts: {
            title: 'Vinegar - Raspberry',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/162x100.png/dddddd/000000',
            },
          },
        },
      },
    ],
    created: 1621755262000,
    ordered: 1646169160000,
    status: 'CONFIRMED',
    isExpired: false,
    orderNumber: '4688744609',
    fullfilled: 1643673921000,
    rejected: 1624615188000,
    updated: 1641658186000,
    country: {
      _id: 'a4703dc6-e3c7-4959-adb8-8bdd44bcfe65',
      isoCode: 'BD',
      flagEmoji: 'Bangladesh',
    },
    currency: {
      isoCode: 'BDT',
      isActive: true,
      _id: '06ee2f34-de0f-486d-9a57-09dbfc20aa31',
    },
    logs: [
      {
        _id: '5a32aa76-9399-4042-a8a6-ce7917aa7a13',
        created: 1629939071000,
        level: 'Minoxidil',
        message:
          'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.',
        user: {
          _id: 'e8040b51-cbed-4fb0-b4c1-c14536863613',
          username: 'ipontefract0',
        },
        order: {
          _id: '5e82aa24-0850-4af1-9fda-29658a61cc9a',
          orderNumber: '1400253098',
        },
      },
      {
        _id: '2c6db71c-6b43-4b69-b37d-2bddcc747aa4',
        created: 1645447577000,
        level: 'Fexofenadine Hydrochloride',
        message:
          'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
        user: {
          _id: 'd29269b6-75b5-47df-8353-f57dc4113e92',
          username: 'mshyram1',
        },
        order: {
          _id: 'ff5c2d81-0f68-407c-9627-50926dd89180',
          orderNumber: '4533778690',
        },
      },
      {
        _id: '154bbf2f-9cee-42d4-b4ae-1df7638fb31b',
        created: 1624512870000,
        level: 'Dextroamphetamine Sulfate',
        message: 'Morbi non lectus.',
        user: {
          _id: '6aca5066-4712-4d4b-a445-b326310ec61e',
          username: 'tjaulme2',
        },
        order: {
          _id: 'c988c241-8768-4abe-876b-4f8293d183fb',
          orderNumber: '3246581088',
        },
      },
    ],
    configuration: {
      value: 'Sawayn, Kshlerin and Cronin',
      compony: 'Kaymbo',
      domain: 'hexun.com',
      TLD: 'mil',
    },
    documents: [
      {
        _id: '03c358e7-c05f-45d6-99e8-5f3530607660',
        name: 'Red and blue macaw',
        type: 'application/x-mspowerpoint',
        url: 'http://soundcloud.com/felis/fusce/posuere/felis/sed/lacus.xml?in=orci&magna=luctus&bibendum=et&imperdiet=ultrices&nullam=posuere&orci=cubilia&pede=curae&venenatis=nulla&non=dapibus&sodales=dolor&sed=vel&tincidunt=est&eu=donec&felis=odio&fusce=justo&posuere=sollicitudin&felis=ut&sed=suscipit&lacus=a&morbi=feugiat&sem=et&mauris=eros&laoreet=vestibulum&ut=ac&rhoncus=est&aliquet=lacinia&pulvinar=nisi&sed=venenatis&nisl=tristique&nunc=fusce&rhoncus=congue&dui=diam&vel=id&sem=ornare&sed=imperdiet&sagittis=sapien&nam=urna&congue=pretium&risus=nisl&semper=ut&porta=volutpat&volutpat=sapien&quam=arcu&pede=sed&lobortis=augue&ligula=aliquam&sit=erat&amet=volutpat&eleifend=in&pede=congue&libero=etiam&quis=justo&orci=etiam&nullam=pretium&molestie=iaculis',
      },
      {
        _id: '2f1512c0-20c8-41e0-8b5c-9d4b8d68c9aa',
        name: 'Goanna lizard',
        type: 'application/excel',
        url: 'https://bizjournals.com/varius/integer/ac/leo.jsp?tellus=pulvinar&nulla=nulla&ut=pede&erat=ullamcorper&id=augue&mauris=a&vulputate=suscipit&elementum=nulla&nullam=elit&varius=ac&nulla=nulla&facilisi=sed&cras=vel&non=enim&velit=sit&nec=amet&nisi=nunc&vulputate=viverra&nonummy=dapibus&maecenas=nulla&tincidunt=suscipit&lacus=ligula&at=in&velit=lacus&vivamus=curabitur&vel=at&nulla=ipsum&eget=ac&eros=tellus&elementum=semper&pellentesque=interdum&quisque=mauris&porta=ullamcorper&volutpat=purus&erat=sit',
      },
    ],
  },
  {
    _id: 'ba67b831-7552-45b5-a304-0102be8dc942',
    user: {
      username: 'jjobbins8',
      avatar: {
        url: 'https://robohash.org/exadin.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: 'af6e1a9b-4aa7-4eed-b519-c982206b98fe',
        qantity: 5,
        product: {
          _id: '42093d16-b4e5-43f1-86cf-d8b6a9245b94',
          texts: {
            title: 'Chinese Foods - Plain Fried Rice',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/153x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
      {
        _id: 'de2e4831-0b6e-4844-ba36-2f73757c6a4d',
        qantity: 4,
        product: {
          _id: 'e0633d1f-caf0-4439-926d-693afda78337',
          texts: {
            title: 'Soup - Campbells, Butternut',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/163x100.png/dddddd/000000',
            },
          },
        },
      },
      {
        _id: '08728c2b-5df9-4e57-be61-a3717ed01b58',
        qantity: 3,
        product: {
          _id: '13c00b2d-bfb4-407d-a6d5-91fffcc081de',
          texts: {
            title: 'Lamb - Loin, Trimmed, Boneless',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/220x100.png/dddddd/000000',
            },
          },
        },
      },
    ],
    created: 1628913009000,
    ordered: 1640915768000,
    status: 'CONFIRMED',
    isExpired: true,
    orderNumber: '3279354544',
    fullfilled: 1630481662000,
    rejected: 1624191507000,
    updated: 1617740673000,
    country: {
      _id: '22cf37e3-7548-4b21-908a-e6146888362f',
      isoCode: 'PH',
      flagEmoji: 'Philippines',
    },
    currency: {
      isoCode: 'PHP',
      isActive: false,
      _id: '89decb55-1ede-4338-834a-febb0c80abe7',
    },
    logs: [
      {
        _id: 'e0c98028-6c99-41a3-87f7-e45633efe194',
        created: 1635867402000,
        level: 'Water',
        message:
          'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
        user: {
          _id: '5059de8d-5bfc-4063-8244-da3a87398fe2',
          username: 'mpreddle0',
        },
        order: {
          _id: 'bf16a851-7f6d-4ec6-9593-1259284ef664',
          orderNumber: '8307320860',
        },
      },
      {
        _id: 'ba3e7c74-5fc1-45d0-9c06-f394697a3f31',
        created: 1637506336000,
        level: 'Mitomycin',
        message: 'Morbi a ipsum. Integer a nibh. In quis justo.',
        user: {
          _id: '9f0d77e3-df03-4240-9fc8-99e812ae98de',
          username: 'lcarey1',
        },
        order: {
          _id: 'a92f5da9-0685-4ec9-8b20-b5aeedc4832d',
          orderNumber: '0448885689',
        },
      },
      {
        _id: '5092aa04-fea6-494e-939c-09abfcac374d',
        created: 1630590107000,
        level: 'acetaminophen, dextromethorphan Hbr, Phenylephrine HCl',
        message:
          'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.',
        user: {
          _id: '4f33ad39-c0cd-4a40-bbbb-7f206db8b8d5',
          username: 'arackstraw2',
        },
        order: {
          _id: 'da6cd5dc-480e-4767-a2cc-77b3d0bbe16e',
          orderNumber: '4288990459',
        },
      },
    ],
    configuration: {
      value: 'Mills, Pagac and Herman',
      compony: 'Skyvu',
      domain: 't.co',
      TLD: 'edu',
    },
    documents: [
      {
        _id: '3bc95d7e-ca31-4793-bfd9-1cb6a3f921fc',
        name: 'Helmeted guinea fowl',
        type: 'video/mpeg',
        url: 'https://archive.org/nunc/donec/quis.aspx?ipsum=orci&dolor=luctus&sit=et&amet=ultrices&consectetuer=posuere&adipiscing=cubilia&elit=curae&proin=duis&interdum=faucibus&mauris=accumsan&non=odio&ligula=curabitur&pellentesque=convallis&ultrices=duis&phasellus=consequat&id=dui&sapien=nec&in=nisi&sapien=volutpat&iaculis=eleifend&congue=donec&vivamus=ut&metus=dolor&arcu=morbi&adipiscing=vel&molestie=lectus&hendrerit=in&at=quam&vulputate=fringilla&vitae=rhoncus&nisl=mauris',
      },
      {
        _id: 'da5af20a-d673-4ecb-822d-530ecf3046d9',
        name: 'Common seal',
        type: 'application/vnd.ms-powerpoint',
        url: 'http://disqus.com/enim/sit/amet/nunc/viverra/dapibus.png?eget=nisi&semper=venenatis&rutrum=tristique&nulla=fusce&nunc=congue&purus=diam&phasellus=id&in=ornare&felis=imperdiet&donec=sapien&semper=urna&sapien=pretium&a=nisl&libero=ut&nam=volutpat&dui=sapien&proin=arcu&leo=sed&odio=augue&porttitor=aliquam&id=erat&consequat=volutpat&in=in&consequat=congue&ut=etiam&nulla=justo&sed=etiam&accumsan=pretium&felis=iaculis&ut=justo&at=in&dolor=hac&quis=habitasse&odio=platea&consequat=dictumst&varius=etiam&integer=faucibus&ac=cursus&leo=urna&pellentesque=ut&ultrices=tellus&mattis=nulla&odio=ut&donec=erat&vitae=id&nisi=mauris&nam=vulputate&ultrices=elementum&libero=nullam&non=varius&mattis=nulla&pulvinar=facilisi&nulla=cras&pede=non&ullamcorper=velit&augue=nec&a=nisi&suscipit=vulputate&nulla=nonummy&elit=maecenas&ac=tincidunt&nulla=lacus&sed=at&vel=velit&enim=vivamus&sit=vel&amet=nulla&nunc=eget',
      },
      {
        _id: 'faae48d5-43d7-4956-9b33-261a46f6dba5',
        name: 'Turtle, snake-necked',
        type: 'video/x-mpeg',
        url: 'http://walmart.com/sem/praesent/id.js?consectetuer=nascetur&adipiscing=ridiculus&elit=mus&proin=vivamus&risus=vestibulum&praesent=sagittis&lectus=sapien&vestibulum=cum&quam=sociis&sapien=natoque&varius=penatibus&ut=et&blandit=magnis&non=dis&interdum=parturient&in=montes&ante=nascetur&vestibulum=ridiculus&ante=mus&ipsum=etiam&primis=vel&in=augue&faucibus=vestibulum&orci=rutrum&luctus=rutrum&et=neque&ultrices=aenean&posuere=auctor&cubilia=gravida&curae=sem&duis=praesent&faucibus=id&accumsan=massa&odio=id&curabitur=nisl&convallis=venenatis&duis=lacinia&consequat=aenean&dui=sit&nec=amet&nisi=justo&volutpat=morbi&eleifend=ut&donec=odio&ut=cras',
      },
      {
        _id: '6a5c44cd-7ea9-4d5b-a8e6-7d59a77f127d',
        name: 'Common wolf',
        type: 'video/quicktime',
        url: 'https://cam.ac.uk/condimentum/curabitur/in/libero.jsp?mauris=ipsum&laoreet=dolor&ut=sit&rhoncus=amet&aliquet=consectetuer&pulvinar=adipiscing&sed=elit&nisl=proin&nunc=interdum&rhoncus=mauris&dui=non&vel=ligula&sem=pellentesque&sed=ultrices&sagittis=phasellus&nam=id&congue=sapien&risus=in&semper=sapien&porta=iaculis&volutpat=congue&quam=vivamus&pede=metus&lobortis=arcu&ligula=adipiscing&sit=molestie&amet=hendrerit&eleifend=at&pede=vulputate&libero=vitae&quis=nisl&orci=aenean&nullam=lectus&molestie=pellentesque&nibh=eget&in=nunc&lectus=donec&pellentesque=quis&at=orci&nulla=eget&suspendisse=orci&potenti=vehicula&cras=condimentum&in=curabitur&purus=in&eu=libero&magna=ut&vulputate=massa&luctus=volutpat&cum=convallis&sociis=morbi&natoque=odio&penatibus=odio&et=elementum&magnis=eu&dis=interdum&parturient=eu&montes=tincidunt&nascetur=in&ridiculus=leo&mus=maecenas&vivamus=pulvinar&vestibulum=lobortis&sagittis=est&sapien=phasellus&cum=sit&sociis=amet&natoque=erat&penatibus=nulla&et=tempus&magnis=vivamus&dis=in&parturient=felis&montes=eu&nascetur=sapien&ridiculus=cursus&mus=vestibulum&etiam=proin&vel=eu&augue=mi&vestibulum=nulla&rutrum=ac&rutrum=enim&neque=in&aenean=tempor&auctor=turpis&gravida=nec',
      },
      {
        _id: '52a4764a-9f61-4417-88e3-8b370eff9214',
        name: 'Ibis, puna',
        type: 'application/x-excel',
        url: 'http://chicagotribune.com/semper/est/quam/pharetra/magna/ac.html?nunc=dui&nisl=proin&duis=leo&bibendum=odio&felis=porttitor&sed=id&interdum=consequat&venenatis=in&turpis=consequat&enim=ut&blandit=nulla&mi=sed&in=accumsan&porttitor=felis&pede=ut&justo=at&eu=dolor&massa=quis&donec=odio&dapibus=consequat&duis=varius&at=integer&velit=ac&eu=leo&est=pellentesque&congue=ultrices&elementum=mattis&in=odio&hac=donec&habitasse=vitae&platea=nisi&dictumst=nam&morbi=ultrices&vestibulum=libero&velit=non&id=mattis&pretium=pulvinar&iaculis=nulla&diam=pede&erat=ullamcorper&fermentum=augue&justo=a&nec=suscipit&condimentum=nulla&neque=elit&sapien=ac&placerat=nulla&ante=sed&nulla=vel&justo=enim&aliquam=sit&quis=amet&turpis=nunc&eget=viverra&elit=dapibus&sodales=nulla&scelerisque=suscipit&mauris=ligula&sit=in&amet=lacus&eros=curabitur&suspendisse=at&accumsan=ipsum&tortor=ac&quis=tellus&turpis=semper&sed=interdum&ante=mauris&vivamus=ullamcorper&tortor=purus&duis=sit&mattis=amet&egestas=nulla&metus=quisque&aenean=arcu&fermentum=libero&donec=rutrum&ut=ac&mauris=lobortis&eget=vel',
      },
    ],
  },
  {
    _id: 'e01151f4-aedb-4f49-8d4b-fa663b3656df',
    user: {
      username: 'owoodwing9',
      avatar: {
        url: 'https://robohash.org/quaeratquibusdamut.png?size=50x50&set=set1',
      },
    },
    items: [
      {
        _id: '71a328c0-3c70-43a7-9782-9ede9d82950f',
        qantity: 1,
        product: {
          _id: '5a3a9fc1-88e8-4fad-b87d-36fd081c7eb4',
          texts: {
            title: 'Wine - Zinfandel California 2002',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/241x100.png/dddddd/000000',
            },
          },
        },
      },
      {
        _id: '1c74eed8-697b-4e1f-8e5b-90da5ef10c0b',
        qantity: 3,
        product: {
          _id: '52681150-c702-4b0c-972b-c1363e8736bc',
          texts: {
            title: 'Eel - Smoked',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/109x100.png/ff4444/ffffff',
            },
          },
        },
      },
      {
        _id: '7c3a88dd-5821-4eae-8c40-cd2b9538ee55',
        qantity: 5,
        product: {
          _id: '80ce3ea9-1cd3-4838-becf-7fb5cbef5a9d',
          texts: {
            title: 'Cookie Dough - Double',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/205x100.png/cc0000/ffffff',
            },
          },
        },
      },
      {
        _id: 'b7e7299d-e3c4-4ae6-9414-002b3b527b98',
        qantity: 2,
        product: {
          _id: '190ed789-285e-4c00-a5d0-b8523f40191a',
          texts: {
            title: 'Bread - English Muffin',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/191x100.png/cc0000/ffffff',
            },
          },
        },
      },
      {
        _id: '676fd1f7-242d-4517-a2aa-2b9bd37c2bfd',
        qantity: 4,
        product: {
          _id: 'd4cb58fb-505d-4cd9-a72d-196c53c53305',
          texts: {
            title: 'Cheese - Mozzarella, Shredded',
          },
          media: {
            file: {
              url: 'http://dummyimage.com/146x100.png/5fa2dd/ffffff',
            },
          },
        },
      },
    ],
    created: 1629703882000,
    ordered: 1632793351000,
    status: 'PENDING',
    isExpired: true,
    orderNumber: '0948778199',
    fullfilled: 1642019229000,
    rejected: 1619922986000,
    updated: 1644059101000,
    country: {
      _id: 'e8099ed6-6dcb-4af8-b460-c73fcf04bfaa',
      isoCode: 'GR',
      flagEmoji: 'Greece',
    },
    currency: {
      isoCode: 'EUR',
      isActive: true,
      _id: '39621c71-cd00-4063-ac82-6a4106d8eca9',
    },
    logs: [
      {
        _id: 'c2c1af30-b2f2-474d-aa4f-dc65d359ee6f',
        created: 1621724425000,
        level: 'Haloperidol Decanoate',
        message: 'Curabitur convallis.',
        user: {
          _id: '59bc0478-c572-42b3-915d-865fd1baa432',
          username: 'gjosilevich0',
        },
        order: {
          _id: '8051f716-0c41-4815-9673-78a33ea12ac6',
          orderNumber: '2996952111',
        },
      },
      {
        _id: '837842ad-3ebd-4f3b-9b3b-ecc09ee3d1b4',
        created: 1623727943000,
        level: 'Propranolol Hydrochloride',
        message: 'Cras non velit nec nisi vulputate nonummy.',
        user: {
          _id: 'e57a2074-1157-4e5e-bc47-be173622f988',
          username: 'phogbourne1',
        },
        order: {
          _id: '6caa610b-5fe4-4929-8688-7d7767a4e62a',
          orderNumber: '2844020755',
        },
      },
      {
        _id: '82c3eb1e-217b-4568-a6bf-f768fc08a100',
        created: 1634314454000,
        level: 'lisinopril',
        message:
          'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.',
        user: {
          _id: '44490368-da0b-49eb-bc3a-048039eef318',
          username: 'zhansie2',
        },
        order: {
          _id: '57071ee2-3153-4a76-b7e7-d46a2dfb6b3f',
          orderNumber: '1846343216',
        },
      },
      {
        _id: '82e87926-749b-457b-af6c-25409b3fe512',
        created: 1641548723000,
        level: 'Divalproex Sodium',
        message: 'Cras pellentesque volutpat dui.',
        user: {
          _id: 'f512586c-0ce8-4d43-bf37-2622e1295666',
          username: 'cmccuffie3',
        },
        order: {
          _id: 'c53b5397-01bf-4d62-9e23-05b2dbf69eda',
          orderNumber: '8310773889',
        },
      },
      {
        _id: 'fb9391b0-92b9-492c-8107-b98ae32d6a61',
        created: 1627811419000,
        level: 'SALICYLIC ACID',
        message:
          'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        user: {
          _id: '15ff7aa6-8097-4bef-b13a-d96a60b66e96',
          username: 'scastagnet4',
        },
        order: {
          _id: '49ad9fbc-a819-4d45-8356-b694ad58f0dd',
          orderNumber: '2462990577',
        },
      },
    ],
    configuration: {
      value: 'Kassulke Group',
      compony: 'Devshare',
      domain: 'google.com',
      TLD: 'com',
    },
    documents: [
      {
        _id: '872a59f2-c2a3-402f-a22c-e5850e5a8f62',
        name: 'Salmon, sockeye',
        type: 'image/jpeg',
        url: 'https://storify.com/in/purus/eu/magna/vulputate.jsp?auctor=porttitor&sed=id&tristique=consequat&in=in&tempus=consequat&sit=ut&amet=nulla&sem=sed&fusce=accumsan&consequat=felis&nulla=ut&nisl=at&nunc=dolor&nisl=quis&duis=odio&bibendum=consequat&felis=varius&sed=integer&interdum=ac&venenatis=leo&turpis=pellentesque&enim=ultrices&blandit=mattis&mi=odio&in=donec&porttitor=vitae&pede=nisi&justo=nam&eu=ultrices&massa=libero&donec=non&dapibus=mattis&duis=pulvinar&at=nulla&velit=pede&eu=ullamcorper',
      },
      {
        _id: '5cea337f-6dea-47c0-999e-8cdac1f47f22',
        name: 'Grey mouse lemur',
        type: 'image/pjpeg',
        url: 'http://upenn.edu/elementum/eu/interdum/eu.jpg?turpis=in&integer=sapien&aliquet=iaculis&massa=congue&id=vivamus&lobortis=metus&convallis=arcu&tortor=adipiscing&risus=molestie&dapibus=hendrerit&augue=at&vel=vulputate&accumsan=vitae&tellus=nisl&nisi=aenean&eu=lectus&orci=pellentesque&mauris=eget&lacinia=nunc&sapien=donec&quis=quis&libero=orci&nullam=eget&sit=orci&amet=vehicula&turpis=condimentum&elementum=curabitur&ligula=in&vehicula=libero&consequat=ut&morbi=massa&a=volutpat&ipsum=convallis&integer=morbi&a=odio&nibh=odio&in=elementum&quis=eu&justo=interdum&maecenas=eu&rhoncus=tincidunt&aliquam=in&lacus=leo&morbi=maecenas&quis=pulvinar&tortor=lobortis&id=est&nulla=phasellus&ultrices=sit&aliquet=amet&maecenas=erat&leo=nulla&odio=tempus&condimentum=vivamus&id=in&luctus=felis&nec=eu&molestie=sapien',
      },
      {
        _id: 'bfd892a1-96ae-47b5-90e5-3c31c9a6f3be',
        name: 'Saddle-billed stork',
        type: 'application/vnd.ms-excel',
        url: 'https://boston.com/sed/vestibulum/sit/amet/cursus/id.jsp?etiam=risus&justo=semper&etiam=porta&pretium=volutpat&iaculis=quam&justo=pede&in=lobortis&hac=ligula&habitasse=sit&platea=amet&dictumst=eleifend&etiam=pede&faucibus=libero&cursus=quis&urna=orci&ut=nullam&tellus=molestie&nulla=nibh&ut=in&erat=lectus&id=pellentesque&mauris=at&vulputate=nulla&elementum=suspendisse&nullam=potenti&varius=cras&nulla=in&facilisi=purus&cras=eu&non=magna&velit=vulputate&nec=luctus&nisi=cum&vulputate=sociis&nonummy=natoque&maecenas=penatibus&tincidunt=et&lacus=magnis&at=dis&velit=parturient&vivamus=montes&vel=nascetur&nulla=ridiculus&eget=mus&eros=vivamus&elementum=vestibulum&pellentesque=sagittis&quisque=sapien&porta=cum&volutpat=sociis&erat=natoque&quisque=penatibus&erat=et&eros=magnis&viverra=dis&eget=parturient&congue=montes&eget=nascetur&semper=ridiculus&rutrum=mus&nulla=etiam&nunc=vel&purus=augue&phasellus=vestibulum&in=rutrum&felis=rutrum&donec=neque&semper=aenean&sapien=auctor&a=gravida&libero=sem&nam=praesent&dui=id&proin=massa&leo=id',
      },
      {
        _id: 'a103864d-74aa-4196-a879-6ab5d0a94781',
        name: 'Blue and yellow macaw',
        type: 'application/powerpoint',
        url: 'http://ibm.com/et/ultrices/posuere.png?sapien=magna&urna=at&pretium=nunc&nisl=commodo&ut=placerat&volutpat=praesent&sapien=blandit&arcu=nam&sed=nulla&augue=integer&aliquam=pede&erat=justo&volutpat=lacinia&in=eget&congue=tincidunt&etiam=eget&justo=tempus&etiam=vel',
      },
      {
        _id: 'a01a850b-e48e-4871-85d5-243478dc1597',
        name: 'Hornbill, red-billed',
        type: 'image/x-tiff',
        url: 'https://webnode.com/eget/eleifend/luctus/ultricies/eu/nibh/quisque.png?convallis=blandit&eget=non&eleifend=interdum&luctus=in&ultricies=ante&eu=vestibulum&nibh=ante&quisque=ipsum&id=primis&justo=in&sit=faucibus&amet=orci&sapien=luctus&dignissim=et&vestibulum=ultrices&vestibulum=posuere&ante=cubilia&ipsum=curae&primis=duis&in=faucibus&faucibus=accumsan&orci=odio&luctus=curabitur&et=convallis&ultrices=duis&posuere=consequat&cubilia=dui&curae=nec&nulla=nisi&dapibus=volutpat&dolor=eleifend&vel=donec&est=ut&donec=dolor&odio=morbi&justo=vel&sollicitudin=lectus&ut=in&suscipit=quam&a=fringilla&feugiat=rhoncus&et=mauris&eros=enim&vestibulum=leo&ac=rhoncus&est=sed&lacinia=vestibulum&nisi=sit&venenatis=amet&tristique=cursus&fusce=id&congue=turpis&diam=integer&id=aliquet&ornare=massa&imperdiet=id&sapien=lobortis&urna=convallis&pretium=tortor&nisl=risus&ut=dapibus&volutpat=augue&sapien=vel&arcu=accumsan&sed=tellus&augue=nisi&aliquam=eu&erat=orci&volutpat=mauris&in=lacinia&congue=sapien&etiam=quis&justo=libero&etiam=nullam&pretium=sit&iaculis=amet&justo=turpis&in=elementum&hac=ligula&habitasse=vehicula&platea=consequat&dictumst=morbi&etiam=a&faucibus=ipsum&cursus=integer&urna=a',
      },
    ],
  },
];

const Order = () => {
  const { loading } = useOrderList();
  const { query, push } = useRouter();
  const { formatMessage } = useIntl();
  useRedirect({ to: '/login', matchGuests: true, matchAnonymous: true });

  const { queryString, ...restQuery } = query;
  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: {
          ...restQuery,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...restQuery,
        },
      });
  };

  return (
    <>
      <MetaTags title={formatMessage({ id: 'my_orders' })} />
      <Header />
      {loading ? (
        <LoadingItem />
      ) : (
        <OrderList
          orders={orders}
          queryString={queryString}
          setQueryString={setQueryString}
        />
      )}
      <Footer />
    </>
  );
};

export default Order;
