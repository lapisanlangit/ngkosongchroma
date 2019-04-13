import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { Router } from '@angular/router';
import { KppnService } from './kppn.service';
import { Kppn } from './kppn';
import { Pesan } from '../../shared/pesan/pesan';



declare var jQuery: any;


@Component({
    selector: 'app-kppn', // moduleId: module.id,
    templateUrl: './kppn.component.html',

})

export class KppnComponent extends BaseComponent implements OnInit {

    public isiKppn: Kppn;
    public listKppn: Kppn[];
    public kppnIni: Kppn;

    

    public ubah: number = 0;

    private _rekam = 0;
    private _index = 0;

    public maskkdkppn = [/[0-9]/, /\d/, /\d/];


    p: number = 1;
    //isikan untuk pesan
    setPesan: Pesan;

 
    constructor(private router: Router, public kppnservice: KppnService) {
        super();

    }

    public closeForm(): void {

        let link = ['/menu/kosong'];
        this.router.navigate(link);

    }


    ngOnInit(): void {

       

        this.isiKppn = {
            "kdkppn": "",
            "nmkppn": ""

        };


        this.ajax = 0;
        this.kppnservice.getKPPN()
            .subscribe(
                data => {
                    this.listKppn = data;
                    setTimeout(() => {
                        this.ajax = 1;
                    }, 3000);

                },
                error => {
                    alert("Error get data satker");
                    return;
                   
                }
            );


    }


    public rekamData(): void {

        this.matiTeks(false);
        this.kosong();

        jQuery('#ctnRekam').modal('show');

        this._rekam = 1;
        setTimeout(function () {
            jQuery('#kdkppn').focus();
        }, 500);


    }

    public kosong(): void {
        this.isiKppn.kdkppn = '';
        this.isiKppn.nmkppn = '';

    }

    /**
     * menghidupkan dan mematikan teks
     */
    public matiTeks(isi: boolean): void {

        jQuery('#kdkppn').prop('readonly', isi);
        jQuery('#nmkppn').prop('readonly', isi);

    }

    public editData(kppnPilih: Kppn): void {

        //cari index untuk proses splice
        this._index = this.listKppn.indexOf(kppnPilih);

        jQuery('#kdkppn').prop('readonly', true);

        this.isiKppn.kdkppn = kppnPilih.kdkppn;
        this.isiKppn.nmkppn = kppnPilih.nmkppn;


        this._rekam = 0;
        jQuery('#ctnRekam').modal('show');

        //focus
        setTimeout(function () {
            jQuery('#nmkppn').focus();
        }, 500);
    }

    public saveData(): void {

        if (this.isiKppn.kdkppn.trim().length === 0) {

            this.setPesan = {
                "judulPesan": "Warning",
                "isiPesan": "Isian Kode Kppn tidak boleh kosong",
                "jenisPesan": 1
            };
            setTimeout(function () {
                jQuery('#ctnpesan').modal('show');
            }, 100);

            setTimeout(function () {
                jQuery('#kdkppn').focus();
            }, 3000);
            return;
        } else {
            let iHas = this.replaceAll(this.isiKppn.kdkppn, "_", "");
            if (iHas.length < 2) {
                this.setPesan = {
                    "judulPesan": "Warning",
                    "isiPesan": "Isian Kode Kppn harus 6 digit",
                    "jenisPesan": 1
                };
                setTimeout(function () {
                    jQuery('#ctnpesan').modal('show');
                }, 100);

                setTimeout(function () {
                    jQuery('#kdkppn').focus();
                }, 3000);
                return;
            }
        }

        if (this.isiKppn.nmkppn.trim().length === 0) {

            this.setPesan = {
                "judulPesan": "Warning",
                "isiPesan": "Isian nama kppn tidak boleh kosong",
                "jenisPesan": 1
            };
            setTimeout(function () {
                jQuery('#ctnpesan').modal('show');
            }, 100);

            setTimeout(function () {
                jQuery('#nmkppn').focus();
            }, 3000);
            return;
        }


        var nilaiSimpan = {
            "kdkppn": this.isiKppn.kdkppn,
            "nmkppn": this.isiKppn.nmkppn


        };

            if (this._rekam == 1) {
                this.kppnservice.cekKppn(nilaiSimpan)
                    .subscribe((hasil) => {
                        let nAda = hasil.length;
                        if (nAda > 0) {
                            this.setPesan = {
                                "judulPesan": "Warning",
                                "isiPesan": "Isian Kode ini sudah ada!",
                                "jenisPesan": 1
                            };
                            setTimeout(function() {
                            jQuery('#ctnpesan').modal('show');    
                            }, 100);
                            setTimeout(function () {
                                jQuery('#kdkategori').focus();
                            }, 3000);
                            return;

                        } else {

                            this.listKppn.push(nilaiSimpan);
                            this.kppnservice.saveKppn(nilaiSimpan)
                                .subscribe(
                                data => console.log(data),
                                error => alert(error)
                                );
                            // console.log('save component');
                            this._rekam = 0;
                            jQuery('#ctnRekam').modal('hide');
                        }

                    });
            } else {
                this.listKppn.splice(this._index, 1, nilaiSimpan);
                this.kppnservice.updateKppn(nilaiSimpan)
                    .subscribe(
                    data => console.log(data),
                    error => alert(error)
                    );
                this._rekam = 0;
                jQuery('#ctnRekam').modal('hide');
            }

    }


    public yesHapus(message: string): void {

        var paramJson = { "kdkppn": this.kppnIni.kdkppn };

        this.kppnservice.hapusKppn(paramJson)
            .subscribe(
            data => console.log(data),
            error => alert(error)
            );
        this.listKppn.splice(this._index, 1);


    }

    public hapusData(kppnPilih: Kppn): void {

        //dapatkan nomor indexnya array object
        this._index = this.listKppn.indexOf(kppnPilih);
        this.kppnIni = kppnPilih;
        this.setPesan = {
            "judulPesan": "Konfirmasi Hapus",
            "isiPesan": "Yakin akan menghapus KPPN ini?",
            "jenisPesan": 2
        };
        setTimeout(function () {
            jQuery('#ctnpesan').modal('show');
        }, 100);


    }

    

   



}