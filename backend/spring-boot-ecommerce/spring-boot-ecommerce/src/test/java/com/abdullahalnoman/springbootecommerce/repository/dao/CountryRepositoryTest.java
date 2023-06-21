package com.abdullahalnoman.springbootecommerce.repository.dao;



import com.abdullahalnoman.springbootecommerce.repository.model.Country;
import com.abdullahalnoman.springbootecommerce.repository.model.State;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;

import java.util.Arrays;


@DataJpaTest(showSql = true)
@TestPropertySource("/application-test.properties")
class CountryRepositoryTest {

    @Autowired
    private CountryRepository countryRepository;


    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    void contextLoads(){
        Assertions.assertNotNull(testEntityManager);
    }

    private Country country;

    @BeforeEach
    void beforeEach(){
        country = new Country();
        country.setName("Bangladesh");
        State state = new State();
        state.setName("Dhaka");
        country.setStates(Arrays.asList(state));
        country.setCode("BD");

    }

    @Test
    void verifyBootStrappingByPersistingACountry(){

        Assertions.assertEquals(0,country.getId());

        int expectedId = testEntityManager.persist(country).getId();
        Assertions.assertEquals(expectedId,country.getId());
    }

    @Test
    void verifyRepositoryByPersistingACountry(){
        Assertions.assertEquals(0,country.getId());
        int countryId =  countryRepository.save(country).getId();
        Assertions.assertEquals(countryId,country.getId());
    }


}
