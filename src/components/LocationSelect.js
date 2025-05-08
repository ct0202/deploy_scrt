import React, { useState, useEffect, useCallback, useRef } from 'react';
import { countries } from 'countries-list';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('country');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const containerRef = useRef(null);
  const [allCities, setAllCities] = useState([]);

  // Load cities data on component mount
  useEffect(() => {
    const loadCitiesData = async () => {
      try {
        const response = await fetch('/pre/worldcities.json');
        const data = await response.json();
        setAllCities(data);
      } catch (error) {
        console.error('Error loading cities data:', error);
      }
    };
    loadCitiesData();
  }, []);

  // Преобразуем объект стран в массив для react-select с русскими названиями
  const countryOptions = Object.entries(countries)
    .map(([code, country]) => ({
      value: code,
      label: countryTranslations[country.name] || country.name,
      originalName: country.name
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'ru'))
    .filter((country, index, self) => 
      index === self.findIndex((c) => c.label === country.label)
    );

  const loadCities = useCallback(async (country) => {
    if (!country || !allCities.length) return;
  
    const cacheKey = country.originalName;
  
    if (cityCache.has(cacheKey)) {
      setCityOptions(cityCache.get(cacheKey));
      return;
    }
  
    setIsLoading(true);
    try {
      // Filter cities for the selected country
      
      const cities = allCities
        .filter(city => city.country === countryTranslations[country.originalName])
        .map(city => ({
          value: `${city.city}_${city.lat}_${city.lng}`,
          label: city.city,
          lat: parseFloat(city.lat),
          lon: parseFloat(city.lng)
        }))
        .filter((city, index, self) => 
          index === self.findIndex((c) => c.label === city.label)
        )
        .sort((a, b) => a.label.localeCompare(b.label, 'ru'));

  
      cityCache.set(cacheKey, cities);
      setCityOptions(cities);
    } catch (error) {
      console.error('Error processing cities:', error);
    } finally {
      setIsLoading(false);
    }
  }, [allCities]);
  

  // Загружаем города при выборе страны
  useEffect(() => {
    if (selectedCountry) {
      loadCities(selectedCountry);
      setSearchQuery('');
    }
  }, [selectedCountry, loadCities]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    setCoordinates(null);
    setActiveTab('city');
    loadCities(country);
  };

  const handleCitySelect = (city) => {
    if (city) {
      setSelectedCity(city);

      setCoordinates({
        latitude: city.lat,
        longitude: city.lon
      });
      onLocationSelect({
        country: selectedCountry.label,
        city: city.label,
        coordinates: {
          latitude: city.lat,
          longitude: city.lon
        }
      });
      setIsModalOpen(false);
    }
  };

  const handleInputClick = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  const filteredOptions = activeTab === 'country' 
    ? countryOptions.filter(country => 
        country.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cityOptions.filter(city => 
        city.label.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCityInput(value);
    
    if (value.length >= 2) {
      const filtered = cityOptions.filter(city => 
        city.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCityOptions(filtered);
    } else {
      setFilteredCityOptions([]);
    }
  };

  const [filteredCityOptions, setFilteredCityOptions] = useState([]);

  return (
    <div className="w-full" ref={containerRef}>
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Ваша страна
      </h1>
      <div
        onClick={() => handleInputClick('country')}
        className="w-full h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e] flex items-center cursor-pointer"
      >
        {selectedCountry ? selectedCountry.label : "Выберите страну"}
      </div>
      
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Населенный пункт (город, деревня)
      </h1>
      <div className="relative">
        <input
          type="text"
          value={selectedCity ? selectedCity.label : ""}
          onChange={handleCityInputChange}
          placeholder="Введите город"
          className="w-full h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
        />
        {filteredCityOptions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#022424] border border-[#233636] rounded-[8px] max-h-[200px] overflow-y-auto z-10">
            {filteredCityOptions.map((city) => (
              <div
                key={`${city.value}_${city.lat}_${city.lon}`}
                onClick={() => {
                  setCityInput('');
                  setFilteredCityOptions([]);
                  handleCitySelect(city);
                }}
                className="p-3 hover:bg-[#043939] cursor-pointer text-white"
              >
                {city.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-[343px] bg-[#022424] border border-[#233636] rounded-[8px] p-4">
            <div className="flex justify-between mb-4">
              <button
                onClick={() => handleTabChange('country')}
                className={`px-4 py-2 rounded-[400px] ${
                  activeTab === 'country'
                    ? 'bg-[#043939] border-[1.5px] border-[#a1f69e] text-white'
                    : 'bg-[#022424] text-white'
                }`}
              >
                Страна
              </button>
              <button
                onClick={() => handleTabChange('city')}
                className={`px-4 py-2 rounded-[400px] ${
                  activeTab === 'city'
                    ? 'bg-[#043939] border-[1.5px] border-[#a1f69e] text-white'
                    : 'bg-[#022424] text-white'
                }`}
              >
                Город
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Поиск ${activeTab === 'country' ? 'страны' : 'города'}...`}
                className="w-full h-[48px] rounded-[8px] bg-[#022424] pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
              />
            </div>

            <div className="h-[300px] overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-8 h-8 border-4 border-[#a1f69e] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-white">Загрузка городов...</p>
                </div>
              ) : activeTab === 'country' ? (
                <div className="space-y-2">
                  {filteredOptions.map((country) => (
                    <div
                      key={country.value}
                      onClick={() => handleCountrySelect(country)}
                      className={`p-2 text-white rounded-[8px] cursor-pointer ${
                        selectedCountry?.value === country.value
                          ? 'bg-[#043939] border-[1.5px] border-[#a1f69e]'
                          : 'hover:bg-[#043939]'
                      }`}
                    >
                      {country.label}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredOptions.map((city) => (
                    <div
                      key={city.value}
                      onClick={() => handleCitySelect(city)}
                      className={`p-2 text-white rounded-[8px] cursor-pointer ${
                        selectedCity?.value === city.value
                          ? 'bg-[#043939] border-[1.5px] border-[#a1f69e]'
                          : 'hover:bg-[#043939]'
                      }`}
                    >
                      {city.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setIsModalOpen(false);
                setSearchQuery('');
              }}
              className="w-full h-[48px] mt-4 bg-[#a1f69e] text-[#022424] rounded-[400px] font-semibold text-[18px] flex items-center justify-center"
            >
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelect; 