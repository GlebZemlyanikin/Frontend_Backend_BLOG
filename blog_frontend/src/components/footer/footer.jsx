import { useEffect, useState } from 'react';
import styled from 'styled-components';

const accessKey = 'c2f9f72f-3734-4eaa-b290-21ab0844b86d';

const headers = {
    'X-Yandex-Weather-Key': accessKey,
};

const FooterContainer = ({ className }) => {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [condition, setCondition] = useState('');

    useEffect(() => {
        fetch(
            'https://api.weather.yandex.ru/v2/forecast?lat=52.37125&lon=4.89388',
            {
                headers,
            }
        )
            .then((response) => response.json())
            .then(({ fact, info }) => {
                setCity(info.tzinfo.name);
                setTemperature(fact.temp);
                setCondition(fact.condition);
            });
    }, []);

    return (
        <div className={className}>
            <div>
                <div>Блог веб-разработчика</div>
                <div>web@developer.ru</div>
            </div>
            <div>
                <div>
                    {city},{' '}
                    {new Date().toLocaleString('ru', {
                        day: 'numeric',
                        month: 'long',
                    })}
                </div>
                <div>
                    {temperature} градусов, {condition}
                </div>
            </div>
        </div>
    );
};

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-item: center;
    width: 1000px;
    height: 120px;
    padding: 20px 40px;
    background-color: #ffffff;
    border-top: 1px solid #f3f4f6;
    box-shadow: 0 -2px 24px rgba(0, 0, 0, 0.04);
    font-weight: 600;
`;
