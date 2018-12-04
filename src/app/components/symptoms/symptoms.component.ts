import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../services/http.service';
import {API_URLS} from '../../constants/constants';
import {Symptom} from '../../models/symptom.model';

import swal from 'sweetalert2';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit {

  loading_error = false;
  fetched_symptoms: Symptom[] = [];
  fetched_IDs = [];
  fetched_Names = [];
  current_symptom = '';
  filtered = [];
  selected = [];
  selectedIDs = [];
  year_of_birth = '2000';
  gender = '';

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this._httpService.get(API_URLS.SYMPTOMS)
      .subscribe((res) => {
        const response = res.json();
        response.forEach((obj) => {
          this.fetched_symptoms.push(new Symptom(obj.ID, obj.Name));
          this.fetched_IDs.push(obj.ID);
          this.fetched_Names.push(obj.Name);
        });
      }, (err) => { this.loading_error = true;});
  }

  filterSuggestions() {
    if (this.current_symptom !== '') {
      this.filtered = this.fetched_Names.filter(function(str) {
        return str.toLowerCase().indexOf(this.current_symptom.toLowerCase()) > -1;
      }.bind(this));
    } else {
      this.filtered = [];
    }
  }

  select(item) {
    this.selected.push(item);
    this.current_symptom = '';
    this.filtered = [];
    const id = this.fetched_Names.indexOf(item) ? this.fetched_IDs[this.fetched_Names.indexOf(item)] : '11';
    this.selectedIDs.push(id);
  }

  remove(item) {
    this.selected.splice(this.selected.indexOf(item), 1);
    this.selectedIDs.splice(this.selected.indexOf(item), 1);
  }

  onSubmit() {
    this.selectedIDs = this.selectedIDs.map((e) =>  '\"' + e + '\"');
    const params = new URLSearchParams();
    params.append('symptoms', '[' + this.selectedIDs + ']');
    params.append('year_of_birth', this.year_of_birth);
    params.append('gender', this.gender);
    this._httpService.get(API_URLS.DIAGNOSIS, params)
      .subscribe((res) => {
        this.launchDiagnosisModal(res.json());
      }, (err) => {
        this.launchErrorModal();
      });
  }

  launchErrorModal() {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'Could not provide  diagnosis. Please provide valid symptoms!',
      footer: '<a>Why do I have this issue?</a>',
    });
  }

  launchDiagnosisModal(issues) {
    console.log(issues);
    if (issues.length < 1) {
      this.launchErrorModal();
    } else {
      swal({
        type: 'info',
        title: issues.length + ' issues detected!',
        html: '<div><h5> You are most likely suffering from</h5><br>' +
              '<h5> Disease name</h5> =><b>' + issues[0].Issue.Name + '</b>' +
              '<h5>Accuracy of diagnosis </h5> => <b>' + issues[0].Issue.Accuracy + '%</b></div>'
      });
    }
  }
}
