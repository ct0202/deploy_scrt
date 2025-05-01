import React, { useState, useEffect, useCallback, useRef } from 'react';
import Select from 'react-select';
import { countries } from 'countries-list';
import axios from 'axios';

// Словарь для перевода названий стран на русский
const countryTranslations = {
  'Russia': 'Россия',
  'United States': 'США',
  'Canada': 'Канада',
  'Germany': 'Германия',
  'France': 'Франция',
  'United Kingdom': 'Великобритания',
  'Japan': 'Япония',
  'China': 'Китай',
  'Ukraine': 'Украина',
  'Belarus': 'Беларусь',
  'Kazakhstan': 'Казахстан',
  'Uzbekistan': 'Узбекистан',
  'Azerbaijan': 'Азербайджан',
  'Armenia': 'Армения',
  'Georgia': 'Грузия',
  'Moldova': 'Молдова',
  'Latvia': 'Латвия',
  'Lithuania': 'Литва',
  'Estonia': 'Эстония',
  'Poland': 'Польша',
  'Czech Republic': 'Чехия',
  'Slovakia': 'Словакия',
  'Hungary': 'Венгрия',
  'Romania': 'Румыния',
  'Bulgaria': 'Болгария',
  'Serbia': 'Сербия',
  'Croatia': 'Хорватия',
  'Slovenia': 'Словения',
  'Montenegro': 'Черногория',
  'Macedonia': 'Северная Македония',
  'Albania': 'Албания',
  'Greece': 'Греция',
  'Turkey': 'Турция',
  'Cyprus': 'Кипр',
  'Israel': 'Израиль',
  'United Arab Emirates': 'ОАЭ',
  'Thailand': 'Таиланд',
  'Vietnam': 'Вьетнам',
  'India': 'Индия',
  'South Korea': 'Южная Корея',
  'Australia': 'Австралия',
  'New Zealand': 'Новая Зеландия',
  'Brazil': 'Бразилия',
  'Argentina': 'Аргентина',
  'Mexico': 'Мексика',
  'Egypt': 'Египет',
  'South Africa': 'ЮАР',
  'Nigeria': 'Нигерия',
  'Kenya': 'Кения',
  'Morocco': 'Марокко',
  'Tunisia': 'Тунис',
  'Algeria': 'Алжир',
  'Libya': 'Ливия',
  'Sudan': 'Судан',
  'Ethiopia': 'Эфиопия',
  'Somalia': 'Сомали',
  'Yemen': 'Йемен',
  'Saudi Arabia': 'Саудовская Аравия',
  'Iraq': 'Ирак',
  'Iran': 'Иран',
  'Afghanistan': 'Афганистан',
  'Pakistan': 'Пакистан',
  'Bangladesh': 'Бангладеш',
  'Myanmar': 'Мьянма',
  'Laos': 'Лаос',
  'Cambodia': 'Камбоджа',
  'Malaysia': 'Малайзия',
  'Singapore': 'Сингапур',
  'Indonesia': 'Индонезия',
  'Philippines': 'Филиппины',
  'Taiwan': 'Тайвань',
  'Hong Kong': 'Гонконг',
  'Macau': 'Макао',
  'Mongolia': 'Монголия',
  'North Korea': 'Северная Корея',
  'Nepal': 'Непал',
  'Bhutan': 'Бутан',
  'Sri Lanka': 'Шри-Ланка',
  'Maldives': 'Мальдивы',
  'Seychelles': 'Сейшелы',
  'Mauritius': 'Маврикий',
  'Madagascar': 'Мадагаскар',
  'Tanzania': 'Танзания',
  'Uganda': 'Уганда',
  'Rwanda': 'Руанда',
  'Burundi': 'Бурунди',
  'Democratic Republic of the Congo': 'Демократическая Республика Конго',
  'Republic of the Congo': 'Республика Конго',
  'Gabon': 'Габон',
  'Equatorial Guinea': 'Экваториальная Гвинея',
  'Cameroon': 'Камерун',
  'Central African Republic': 'Центральноафриканская Республика',
  'Chad': 'Чад',
  'Niger': 'Нигер',
  'Mali': 'Мали',
  'Burkina Faso': 'Буркина-Фасо',
  'Benin': 'Бенин',
  'Togo': 'Того',
  'Ghana': 'Гана',
  'Ivory Coast': 'Кот-д\'Ивуар',
  'Liberia': 'Либерия',
  'Sierra Leone': 'Сьерра-Леоне',
  'Guinea': 'Гвинея',
  'Guinea-Bissau': 'Гвинея-Бисау',
  'Senegal': 'Сенегал',
  'Gambia': 'Гамбия',
  'Mauritania': 'Мавритания',
  'Western Sahara': 'Западная Сахара',
  'Angola': 'Ангола',
  'Namibia': 'Намибия',
  'Botswana': 'Ботсвана',
  'Zimbabwe': 'Зимбабве',
  'Zambia': 'Замбия',
  'Malawi': 'Малави',
  'Mozambique': 'Мозамбик',
  'Eswatini': 'Эсватини',
  'Lesotho': 'Лесото',
  'Comoros': 'Коморы',
  'Mayotte': 'Майотта',
  'Reunion': 'Реюньон',
  'Saint Helena': 'Остров Святой Елены',
  'Ascension Island': 'Остров Вознесения',
  'Tristan da Cunha': 'Тристан-да-Кунья',
  'Falkland Islands': 'Фолклендские острова',
  'South Georgia and the South Sandwich Islands': 'Южная Георгия и Южные Сандвичевы острова',
  'Antarctica': 'Антарктида',
  'Bouvet Island': 'Остров Буве',
  'Heard Island and McDonald Islands': 'Острова Херд и Макдональд',
  'French Southern Territories': 'Французские Южные и Антарктические территории',
  'South Sudan': 'Южный Судан',
  'Eritrea': 'Эритрея',
  'Djibouti': 'Джибути',
  'Somaliland': 'Сомалиленд',
  'Western Sahara': 'Западная Сахара',
  'Sahrawi Arab Democratic Republic': 'Сахарская Арабская Демократическая Республика',
  'Republic of Artsakh': 'Республика Арцах',
  'Transnistria': 'Приднестровье',
  'Abkhazia': 'Абхазия',
  'South Ossetia': 'Южная Осетия',
  'Northern Cyprus': 'Северный Кипр',
  'Kosovo': 'Косово',
  'Palestine': 'Палестина',
  'Western Sahara': 'Западная Сахара',
  'Somaliland': 'Сомалиленд',
  'Taiwan': 'Тайвань',
  'Hong Kong': 'Гонконг',
  'Macau': 'Макао',
  'Christmas Island': 'Остров Рождества',
  'Cocos (Keeling) Islands': 'Кокосовые острова',
  'Norfolk Island': 'Остров Норфолк',
  'Niue': 'Ниуэ',
  'Cook Islands': 'Острова Кука',
  'Tokelau': 'Токелау',
  'American Samoa': 'Американское Самоа',
  'Guam': 'Гуам',
  'Northern Mariana Islands': 'Северные Марианские острова',
  'Puerto Rico': 'Пуэрто-Рико',
  'U.S. Virgin Islands': 'Виргинские острова США',
  'British Virgin Islands': 'Британские Виргинские острова',
  'Anguilla': 'Ангилья',
  'Montserrat': 'Монтсеррат',
  'Guadeloupe': 'Гваделупа',
  'Martinique': 'Мартиника',
  'Saint Martin': 'Сен-Мартен',
  'Saint Barthélemy': 'Сен-Бартелеми',
  'Saint Pierre and Miquelon': 'Сен-Пьер и Микелон',
  'Bermuda': 'Бермуды',
  'Cayman Islands': 'Острова Кайман',
  'Turks and Caicos Islands': 'Теркс и Кайкос',
  'Aruba': 'Аруба',
  'Curaçao': 'Кюрасао',
  'Sint Maarten': 'Синт-Мартен',
  'Bonaire': 'Бонайре',
  'Saba': 'Саба',
  'Sint Eustatius': 'Синт-Эстатиус',
  'Greenland': 'Гренландия',
  'Faroe Islands': 'Фарерские острова',
  'Åland Islands': 'Аландские острова',
  'Svalbard and Jan Mayen': 'Шпицберген и Ян-Майен',
  'Bouvet Island': 'Остров Буве',
  'Heard Island and McDonald Islands': 'Острова Херд и Макдональд',
  'French Southern Territories': 'Французские Южные и Антарктические территории',
  'South Georgia and the South Sandwich Islands': 'Южная Георгия и Южные Сандвичевы острова',
  'Antarctica': 'Антарктида',
  'British Indian Ocean Territory': 'Британская территория в Индийском океане',
  'Christmas Island': 'Остров Рождества',
  'Cocos (Keeling) Islands': 'Кокосовые острова',
  'Norfolk Island': 'Остров Норфолк',
  'Niue': 'Ниуэ',
  'Cook Islands': 'Острова Кука',
  'Tokelau': 'Токелау',
  'American Samoa': 'Американское Самоа',
  'Guam': 'Гуам',
  'Northern Mariana Islands': 'Северные Марианские острова',
  'Puerto Rico': 'Пуэрто-Рико',
  'U.S. Virgin Islands': 'Виргинские острова США',
  'British Virgin Islands': 'Британские Виргинские острова',
  'Anguilla': 'Ангилья',
  'Montserrat': 'Монтсеррат',
  'Guadeloupe': 'Гваделупа',
  'Martinique': 'Мартиника',
  'Saint Martin': 'Сен-Мартен',
  'Saint Barthélemy': 'Сен-Бартелеми',
  'Saint Pierre and Miquelon': 'Сен-Пьер и Микелон',
  'Bermuda': 'Бермуды',
  'Cayman Islands': 'Острова Кайман',
  'Turks and Caicos Islands': 'Теркс и Кайкос',
  'Aruba': 'Аруба',
  'Curaçao': 'Кюрасао',
  'Sint Maarten': 'Синт-Мартен',
  'Bonaire': 'Бонайре',
  'Saba': 'Саба',
  'Sint Eustatius': 'Синт-Эстатиус',
  'Greenland': 'Гренландия',
  'Faroe Islands': 'Фарерские острова',
  'Åland Islands': 'Аландские острова',
  'Svalbard and Jan Mayen': 'Шпицберген и Ян-Майен'
};

// Кэш для хранения списков городов
const cityCache = new Map();

const LocationSelect = ({ onLocationSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const containerRef = useRef(null);

  // Преобразуем объект стран в массив для react-select с русскими названиями
  const countryOptions = Object.entries(countries)
    .map(([code, country]) => ({
      value: code,
      label: countryTranslations[country.name] || country.name,
      originalName: country.name
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'ru'));

  const loadCities = useCallback(async (country) => {
    if (!country) return;
  
    const cacheKey = country.originalName;
  
    if (cityCache.has(cacheKey)) {
      setCityOptions(cityCache.get(cacheKey));
      return;
    }
  
    try {
      const query = `
        [out:json][timeout:25];
        area["ISO3166-1"="${country.value}"][admin_level=2];
        (
          node["place"="city"](area);
          node["place"="town"](area);
        );
        out body;
      `;
  
      const response = await axios.post(
        'https://overpass-api.de/api/interpreter',
        query,
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      );
  
      const cities = response.data.elements
        .map(item => ({
          value: item.tags.name,
          label: item.tags.name,
          lat: item.lat,
          lon: item.lon
        }))
        .sort((a, b) => a.label.localeCompare(b.label, 'ru'));
  
      cityCache.set(cacheKey, cities);
      setCityOptions(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }, []);
  

  // Загружаем города при выборе страны
  useEffect(() => {
    if (selectedCountry) {
      loadCities(selectedCountry);
    }
  }, [selectedCountry, loadCities]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null);
    setCityOptions([]);
    setCoordinates(null);
    onLocationSelect({
      country: selectedOption.label,
      city: '',
      coordinates: { latitude: null, longitude: null }
    });
  };

  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
      setSelectedCity(selectedOption);
      setCoordinates({
        latitude: selectedOption.lat,
        longitude: selectedOption.lon
      });
      onLocationSelect({
        country: selectedCountry.label,
        city: selectedOption.label,
        coordinates: {
          latitude: selectedOption.lat,
          longitude: selectedOption.lon
        }
      });
    } else {
      setSelectedCity(null);
      setCoordinates(null);
      onLocationSelect({
        country: selectedCountry.label,
        city: '',
        coordinates: { latitude: null, longitude: null }
      });
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#022424',
      borderColor: '#233636',
      height: '64px',
      borderRadius: '8px',
      '&:hover': {
        borderColor: '#a1f69e'
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white'
    }),
    input: (base) => ({
      ...base,
      color: 'white'
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#022424',
      borderColor: '#233636',
      zIndex: 9999
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#043939' : '#022424',
      color: 'white',
      '&:hover': {
        backgroundColor: '#043939'
      }
    })
  };

  const handleFocus = (element) => {
    if (containerRef.current && element) {
      setTimeout(() => {
        const container = containerRef.current;
        const selectElement = element.closest('.react-select__control');
        if (selectElement) {
          const containerRect = container.getBoundingClientRect();
          const selectRect = selectElement.getBoundingClientRect();
          const scrollTop = selectRect.top - containerRect.top - (containerRect.height / 2) + (selectRect.height / 2);
          container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Ваша страна
      </h1>
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
        onFocus={(e) => handleFocus(e.target)}
        placeholder="— выберите страну —"
        className="mt-4"
        styles={customStyles}
      />
      
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Населенный пункт (город, деревня)
      </h1>
      <Select
        options={cityOptions}
        value={selectedCity}
        onChange={handleCitySelect}
        onFocus={(e) => handleFocus(e.target)}
        placeholder="Выберите город"
        className="mt-4"
        styles={customStyles}
        isClearable
        isSearchable={true}
        isLoading={selectedCountry && cityOptions.length === 0}
        noOptionsMessage={() => "Город не найден"}
        formatCreateLabel={(inputValue) => `Использовать "${inputValue}"`}
        onCreateOption={(inputValue) => {
            const newOption = {
                value: inputValue,
                label: inputValue,
                lat: null,
                lon: null
            };
            handleCitySelect(newOption);
        }}
      />
    </div>
  );
};

export default LocationSelect; 