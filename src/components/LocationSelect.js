import React, { useState, useEffect } from 'react';
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

const LocationSelect = ({ onLocationSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  // Преобразуем объект стран в массив для react-select с русскими названиями
  const countryOptions = Object.entries(countries)
    .map(([code, country]) => ({
      value: code,
      label: countryTranslations[country.name] || country.name,
      originalName: country.name
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'ru'));

  // Функция для поиска городов через Nominatim API
  const searchCities = async (query) => {
    if (!query || !selectedCountry) return;
    
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query},${selectedCountry.originalName}&limit=5&accept-language=ru`
      );
      
      const suggestions = response.data.map(item => ({
        value: item.display_name,
        label: item.display_name,
        lat: item.lat,
        lon: item.lon
      }));
      
      setCitySuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    if (cityInput.length > 2) {
      const debounceTimer = setTimeout(() => {
        searchCities(cityInput);
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [cityInput, selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setCityInput('');
    setCitySuggestions([]);
    setCoordinates(null);
    onLocationSelect({
      country: selectedOption.label,
      city: '',
      coordinates: { latitude: null, longitude: null }
    });
  };

  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
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
      borderColor: '#233636'
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

  return (
    <div className="w-full">
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Ваша страна
      </h1>
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="— выберите страну —"
        className="mt-4"
        styles={customStyles}
      />
      
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Населенный пункт (город, деревня)
      </h1>
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Введите название"
        className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
      />
      
      {citySuggestions.length > 0 && (
        <div className="mt-2">
          <Select
            options={citySuggestions}
            onChange={handleCitySelect}
            placeholder="Выберите город из списка"
            styles={customStyles}
          />
        </div>
      )}
    </div>
  );
};

export default LocationSelect; 